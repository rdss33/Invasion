import Deck from "./Deck/Deck";
import ActiveStack from "./Active Stack/ActiveStack";
import Discard from "./Discard/Discard";
import { Card } from "../Cards/Card";
import { PlayerStat } from "../Player Stats/Stats/PlayerStat";
import "./StackManager.css"

interface IStackManagerProps {
    currentDeck: Card[],
    currentActiveStack: Card[],
    currentDiscard: Card[],
    currentPlayerStats: PlayerStat[],
}

export default function StackManager({currentDeck, currentActiveStack, currentDiscard}: Readonly<IStackManagerProps>){
   
    return(
        <div className="stack-manager-group">
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