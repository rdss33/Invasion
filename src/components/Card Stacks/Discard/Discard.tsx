import { Card } from "../../Cards/Card";
import CardStack from "../CardStack";

interface IDiscardProps {
    currentDiscard: Card[];
}
export default function Discard({currentDiscard}: Readonly<IDiscardProps>){

    return(
        <div>
            <CardStack stackName="Recovering" currentStack={currentDiscard}/>
        </div>
    )
}