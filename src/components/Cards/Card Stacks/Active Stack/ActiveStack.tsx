import React from "react";
import { Card } from "../../Card";
import { PlayerStat } from "../../../Player Stats/Stats/PlayerStat";

interface IActiveStackProps {
    currentActiveStack: Card[],
}
export default function ActiveStack({currentActiveStack}: Readonly<IActiveStackProps>){

    return(
        <div>
            {/* Show active cards here */}
        </div>
    )
}