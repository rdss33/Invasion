import { INITIAL_DECK } from "./InitialDeck"
import { Card } from "../../Cards/Card"; 
import { useState } from "react"
import CardStack from "../CardStack";

interface IDeckProps {
    currentDeck: Card[]
}

export default function Deck({currentDeck}: Readonly<IDeckProps>){
    return(
        <CardStack currentStack={currentDeck}/>
    )
}