import { useState } from 'react'
import './App.css'
import { Guard, GuardInformation, GuardAttributes } from './components/Cards/Battle Cards/Guard'
import { Card } from './components/Cards/Card';
import { INITIAL_DECK } from './components/Card Stacks/Deck/InitialDeck';
import StackManager from './components/Card Stacks/StackManager';

function App() {
  let newGuard = new Guard(GuardInformation,GuardAttributes);
  const [currentDeck,setCurrentDeck] = useState<Card[]>(INITIAL_DECK);
  const [currentActiveStack,setCurrentActiveStack] = useState<Card[]>([]);
  const [currentDiscard,setCurrentDiscard] = useState<Card[]>([]);
  
  return (
    <>
      <StackManager 
        currentDeck={currentDeck}
        handleDeck={setCurrentDeck} 
        currentDiscard={currentDiscard} 
        handleDiscard={setCurrentDiscard}
        currentActiveStack={currentActiveStack} 
        handleActiveStack={setCurrentActiveStack}
      />
    </>
  )
}

export default App
