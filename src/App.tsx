import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Card } from './components/Cards/Card';
import { INITIAL_DECK } from './components/Card Stacks/Deck/InitialDeck';
import { INITIAL_PLAYER_STATS } from './components/Player Stats/Stats/InitialPlayerStats';
import { INITIAL_BASE_PLAYER_STATS } from './components/Player Stats/Stats/InitialBasePlayerStats';

import { StackController } from './components/Card Stacks/StackController';
import StackManager from './components/Card Stacks/StackManager';
import PlayerStatManager from './components/Player Stats/PlayerStatManager/PlayerStatManager';
import { CardGenerator } from './components/Cards/GenerateCards';
import { PlayerStat } from './components/Player Stats/Stats/PlayerStat';
import { PlayerStatController } from './components/Player Stats/PlayerStatManager/PlayerStatController';

import TimeBar from './components/Game Manager/TimeBar';
import EnemyManager from './components/Enemies/Enemy Manager/EnemyManager';
import { Enemy } from './components/Enemies/Enemy Objects/Enemy';

function App() {

  //#region Time Management
  const TIME_UNIT = 50;// Base time of game refreshing, every 50ms
  const TICK_TIME = 500;// Every 500 miliseconds, there will be most of the game mechanics being executed
  const TICKS_TO_PLAY = 5;// How many ticks it takes for the next card to be played
  const playCardCounter = useRef(0);// Counts how many ticks have happened, eventually triggers a Card Play Event
  const [tickToggle,setTickToggle] = useState<boolean>(false);// Toggle every time timer TICK_TIME is over, allowing a tick event to happen
  const [timeElapsed,setTimeElapsed] = useState<number>(0);// This shows the time elapse in miliseconds since last tick

  const delay = (ms:number) => new Promise(res=>setTimeout(res,ms));// Creates a function that uses async in order to delay execution for a period of time
  useEffect(()=>{
    if(timeElapsed<TICK_TIME)// If tick time is not over yet
    {
      delay(TIME_UNIT).then(// Delay this code block for a set amount of miliseconds
        ()=>{
          setTimeElapsed(oldTime=>oldTime+TIME_UNIT);// Update the current elapsed time, also triggering the function again
        }
      );
    } else {
      setTickToggle(oldValue=>!oldValue);// This will cause the tick state to toggle, triggering all the on tick events
    }
    
  },[timeElapsed]); // This use effect is called whenever there is a change to timeElapsed variable, which is also changed in this function call, causing a infinite looping effect

  //#endregion

  //#region Player Stats
  const [playerStats,setPlayerStats] = useState<PlayerStat[]>(INITIAL_PLAYER_STATS);// Current player stats
  const [basePlayerStats] = useState<PlayerStat[]>(INITIAL_BASE_PLAYER_STATS);// Values that stats need to return to
  const playerStatController = new PlayerStatController(
    playerStats,
    (value)=>setPlayerStats(value),
    basePlayerStats
  );// Instances a class that controls player stats state, this is rebuilt every update!
  //#endregion

  //#region Card Management
  const cardGenerator = new CardGenerator();// Instances a class that creates cards
  const [currentDeck,setCurrentDeck] = useState<Card[]>(cardGenerator.GenerateCards(INITIAL_DECK)); // Using the card generator object, Generate Cards method will create objs based on passed ID's and inject them with the stat controller
  const [currentActiveStack,setCurrentActiveStack] = useState<Card[]>([]);// Initializes an empty active stack
  const [currentDiscard,setCurrentDiscard] = useState<Card[]>([]);// Initializes an empty discard stack
  const stackController = new StackController( // This object will be responsible for moving cards around their stacks and executing their actions
    setCurrentDiscard,
    setCurrentActiveStack,
    setCurrentDeck,
    playerStatController
  );
  
  function activateCards(){// This function will activate each card in the active stack, in order
    currentActiveStack.forEach(activeCard => { // Cycle through each card
      activeCard.Countdown(playerStatController,stackController);// Execure the card's countdown
    });
    playerStatController.UnloadAccumulators();// This will get all the accumulated stat changes during the activate cards step into the player's stat
  }

  function recoverCards(){// This function will countdown the timers for discarded cards to recover back to the deck
    currentDiscard.forEach(discardedCard=>{// Cycle throw each card in the discard stack
      discardedCard.Recover(playerStatController,stackController);// Execute the card's Recover function 
    })
  }
  //#endregion

  //#region Enemy Management
  const [currentEnemies,setCurrentEnemies] = useState<Enemy[]>([]);

  //#endregion

  

  //#region Game Effects
  useEffect(()=>{
    playCardCounter.current++;// Increments the counter to determine when cards will be played
    if(currentDeck.length>0 && playCardCounter.current >= TICKS_TO_PLAY)// If there are any cards left in the deck
    {
      stackController.PlayCard(currentDeck[0]);// Play the top card of the deck stack
      playCardCounter.current = 0;// Resets the counter
    }
    activateCards();// Calls the function that will execute each card's effects in order
    recoverCards();// Calls the function that will execute each card's recovery in order
    setTimeElapsed(0);// Resets the current elapsed time, also triggering the function again
  },[tickToggle]); // This effect is used whenever there is a toggle to the tick value, allowing the game to progress
  //#endregion


  return (
    <div id="app">
      <div className="display-group-one">
        <TimeBar currentTime={timeElapsed}/>
        <PlayerStatManager // This component will display the player stats
        currentPlayerStats = {playerStats}
        />
        <StackManager // This component will display and manipulate the player's cards
          currentDeck={currentDeck}
          currentDiscard={currentDiscard} 
          currentActiveStack={currentActiveStack} 
          currentPlayerStats={playerStats}
        />
      </div>
      <div className="display-group-two">
        <EnemyManager/>
      </div>
    </div>
  )
}

export default App
