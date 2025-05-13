import React from "react";
import { Card } from "../../Card";
import CardStack from "../CardStack";

interface IDiscardProps {
    currentDiscard: Card[];
}
export default function Discard({currentDiscard}: Readonly<IDiscardProps>){

    return(
        <div>
            <CardStack currentStack={currentDiscard}/>
        </div>
    )
}