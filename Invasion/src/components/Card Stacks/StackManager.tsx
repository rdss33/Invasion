import React, { useState } from "react";
import Deck from "./Deck/Deck";
import ActiveStack from "./Active Stack/ActiveStack";
import Discard from "./Discard/Discard";
import { Card } from "../Cards/Card";
import { PlayerStat } from "../Player Stats/Stats/PlayerStat";
import { PlayerStatController } from "../Player Stats/PlayerStatManager/PlayerStatController";


interface IStackManagerProps {
    currentDeck: Card[],
    currentActiveStack: Card[],
    currentDiscard: Card[],
    currentPlayerStats: PlayerStat[],
    handleDeck: React.Dispatch<React.SetStateAction<Card[]>>,
    handleDiscard: React.Dispatch<React.SetStateAction<Card[]>>,
    handleActiveStack: React.Dispatch<React.SetStateAction<Card[]>>,
    playerStatController: PlayerStatController
}

export default function StackManager({currentDeck, currentActiveStack, currentDiscard, handleDeck, handleActiveStack, handleDiscard, playerStatController}: Readonly<IStackManagerProps>){
    function PlayCard(card: Card){
        card.Play(playerStatController);
        TransferStacks(handleDeck,handleActiveStack,card);
    }
    function ExhaustCard(card:Card){
        TransferStacks(handleActiveStack,handleDiscard,card);
    }
    function RecoverCard(card:Card){
        TransferStacks(handleDiscard,handleDeck,card);
    }
    function TransferStacks(handleStack1: React.Dispatch<React.SetStateAction<Card[]>>,handleStack2: React.Dispatch<React.SetStateAction<Card[]>>, card: Card){
        if (card===undefined)
            return false;
        handleStack1((prevState)=>{
            let newStack1 = [...prevState];
            const index = newStack1.indexOf(card);// Verifies card index, returns -1 if it doesn't exist
            if(index!=-1){
                newStack1.splice(index,1); // Removes card to be played
            }
            return newStack1;
        });
        handleStack2((prevState)=>{
            let newStack2 = [...prevState];
            const duplicateCard = newStack2.includes(card); // Verifies if card has already been added to the array
            if(!duplicateCard)
            {
                newStack2.push(card); // Adds to the end of the array a new card
            }
            return newStack2;
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
            <button type="button" onClick={()=>PlayCard(currentDeck[0])}>Play</button>
            <button type="button" onClick={()=>ExhaustCard(currentActiveStack[0])}>Exhaust</button>
            <button type="button" onClick={()=>RecoverCard(currentDiscard[0])}>Recover</button>
        </div>
    )
}