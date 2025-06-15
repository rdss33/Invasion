import { PlayerStat } from "../Stats/PlayerStat";
import PlayerStatDisplay from "./PlayerStatDisplay";
import "./PlayerStatManager.css"

interface IPlayerStatManagerProps{
    currentPlayerStats: PlayerStat[],
}

export default function PlayerStatManager({currentPlayerStats}: Readonly<IPlayerStatManagerProps>){
    return(
        <div className="player-stat-manager">
            {currentPlayerStats
                .map((stat : PlayerStat)=> 
                    <PlayerStatDisplay key={stat.Name} stat={stat}/>
                )
            }
        </div>
    );
}
