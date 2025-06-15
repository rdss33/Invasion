import { Card } from "../../Cards/Card";
import CardStack from "../CardStack";

interface IDeckProps {
    currentDeck: Card[]
}

export default function Deck({currentDeck}: Readonly<IDeckProps>){
    return(
        <CardStack stackName="Reserve" currentStack={currentDeck}/>
    )
}