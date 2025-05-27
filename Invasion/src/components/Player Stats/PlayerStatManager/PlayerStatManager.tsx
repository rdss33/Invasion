import React from "react";
import { PlayerStat } from "../Stats/PlayerStat";
import PlayerStatDisplay from "./PlayerStatDisplay";
import { PlayerStatController } from "./PlayerStatController";

interface IPlayerStatManagerProps{
    currentPlayerStats: PlayerStat[],
}

export default function PlayerStatManager({currentPlayerStats}: Readonly<IPlayerStatManagerProps>){
    console.log("Updated");
    return(
        <div>
            {currentPlayerStats
                .map((stat : PlayerStat)=> 
                    <PlayerStatDisplay key={stat.Name} stat={stat}/>
                )
            }
        </div>
    );
}
