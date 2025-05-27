import React from "react";
import { PlayerStat } from "../Stats/PlayerStat";

interface IPlayerStatDisplayProps{
    stat: PlayerStat
}

export default function PlayerStatDisplay({stat}:Readonly<IPlayerStatDisplayProps>){
    const {Name,Value} = stat;
    return(
        <div>
            <h2>{Name}</h2>
            <p>{Value}</p>
        </div>
    )
}