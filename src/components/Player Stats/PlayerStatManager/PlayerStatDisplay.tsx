import { PlayerStat } from "../Stats/PlayerStat";
import "./PlayerStatDisplay.css"

interface IPlayerStatDisplayProps{
    stat: PlayerStat
}

export default function PlayerStatDisplay({stat}:Readonly<IPlayerStatDisplayProps>){
    const {Name,Value} = stat;
    let className = `player-stat-block ${Name}`;
    return(
        <div className={className}>
            <h2 className="title">{Name}</h2>
            <p className="value">{Value}</p>
        </div>
    )
}