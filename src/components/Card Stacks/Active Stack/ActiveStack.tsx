import { Card } from "../../Cards/Card";
import CardStack from "../CardStack";

interface IActiveStackProps {
    currentActiveStack: Card[];
}
export default function ActiveStack({currentActiveStack}: Readonly<IActiveStackProps>){

    return(
        <CardStack stackName="Deployed" currentStack={currentActiveStack}/>
    )
}