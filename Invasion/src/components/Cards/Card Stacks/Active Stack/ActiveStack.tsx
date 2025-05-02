import React from "react";
import { Card } from "../../Card";
import CardStack from "../CardStack";

interface IActiveStackProps {
    currentActiveStack: Card[];
}
export default function ActiveStack({currentActiveStack}: Readonly<IActiveStackProps>){

    return(
        <div>
            <CardStack currentStack={currentActiveStack}/>
        </div>
    )
}