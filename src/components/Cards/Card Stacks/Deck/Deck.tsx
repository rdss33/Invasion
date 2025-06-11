import { INITIAL_DECK } from "./InitialDeck"
import { Card } from "../../Card"
import { useState } from "react"

interface IDeckProps {
    currentDeck: Card[]
}

export default function Deck({currentDeck}: Readonly<IDeckProps>){
    return(
        <div>
            {/* Show back of cards here */}
        </div>
    )
}