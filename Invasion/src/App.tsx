import { useState } from 'react'
import './App.css'
import { Card } from './components/Cards/Card';
import { INITIAL_DECK } from './components/Card Stacks/Deck/InitialDeck';
import { INITIAL_PLAYER_STATS } from './components/Player Stats/Stats/InitialPlayerStats';
import { INITIAL_BASE_PLAYER_STATS } from './components/Player Stats/Stats/InitialBasePlayerStats';

import StackManager from './components/Card Stacks/StackManager';
import EnemyManager from './components/Enemies/Enemy Manager/EnemyManager';
import PlayerStatManager from './components/Player Stats/PlayerStatManager/PlayerStatManager';
import { CardGenerator } from './components/Cards/GenerateCards';

import { PlayerStat } from './components/Player Stats/Stats/PlayerStat';
import { PlayerStatController } from './components/Player Stats/PlayerStatManager/PlayerStatController';

function App() {

  const [playerStats,setPlayerStats] = useState<PlayerStat[]>(INITIAL_PLAYER_STATS);// Current player stats
  const [basePlayerStats,setBasePlayerStats] = useState<PlayerStat[]>(INITIAL_BASE_PLAYER_STATS);// Values that stats need to return to
  const playerStatController = new PlayerStatController(
    playerStats,
    (value)=>setPlayerStats(value),
    basePlayerStats
  );// Instances a class that controls player stats state, this is rebuilt every update!
  const cardGenerator = new CardGenerator(playerStatController);// Instances a class that creates cards
  const [currentDeck,setCurrentDeck] = useState<Card[]>(cardGenerator.GenerateCards(INITIAL_DECK)); // Using the card generator object, Generate Cards method will create objs based on passed ID's and inject them with the stat controller
  const [currentActiveStack,setCurrentActiveStack] = useState<Card[]>([]);// Initializes an empty active stack
  const [currentDiscard,setCurrentDiscard] = useState<Card[]>([]);// Initializes an empty discard stack
  
  console.log("Updated the app");
  return (
    <>
      <PlayerStatManager // This component will display the player stats
        currentPlayerStats = {playerStats}
      />
      <StackManager // This component will display and manipulate the player's cards
        currentDeck={currentDeck}
        handleDeck={setCurrentDeck} 
        currentDiscard={currentDiscard} 
        handleDiscard={setCurrentDiscard}
        currentActiveStack={currentActiveStack} 
        handleActiveStack={setCurrentActiveStack}
        currentPlayerStats={playerStats}
        playerStatController={playerStatController}
      />
      <EnemyManager/>
      <button onClick={()=>{
        currentActiveStack.forEach(activeCard => {
          activeCard.Countdown(playerStatController);
        });
        playerStatController.UnloadAccumulators();
      }}>Countdown</button>
    </>
  )
}

export default App
