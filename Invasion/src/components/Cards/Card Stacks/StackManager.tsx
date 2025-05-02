import React, { useState } from "react";
import Deck from "./Deck/Deck";
import { INITIAL_DECK } from "./Deck/InitialDeck";
import ActiveStack from "./Active Stack/ActiveStack";
import Discard from "./Discard/Discard";
import { Card } from "../Card";


export default function StackManager(){
    const EMPTY_CARD_STACK : Card[] = [];
    const [currentDeck,setCurrentDeck] = useState(INITIAL_DECK);
    const [currentActiveStack,setCurrentActiveStack] = useState(EMPTY_CARD_STACK);
    const [currentDiscard,setCurrentDiscard] = useState(EMPTY_CARD_STACK);

    function PlayCard(){
        const topCard = currentDeck[0];
        setCurrentDeck((prevState)=>{
            let newDeck = [...prevState];
            newDeck= newDeck.slice(1,-1);// Removes index 0
            return newDeck;
        });
        setCurrentActiveStack((prevState)=>{
            let newActiveStack = [...prevState];
            newActiveStack.push(topCard); // Adds to the end of the array a new card
            return newActiveStack;
        });
    }

    return(
        <div>
            <Deck 
                currentDeck={currentDeck}
            />
            <ActiveStack 
                currentActiveStack={currentActiveStack}
            />
            <Discard
                currentDiscard={currentDiscard}
            />
        </div>
    )
}