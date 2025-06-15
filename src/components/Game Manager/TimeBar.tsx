import "./TimeBar.css"

interface ITimeBar{
    currentTime: number
}

export default function TimeBar({currentTime}:Readonly<ITimeBar>){
    return(
        <div className="time-bar-group">
            <h2 className="time-title">Time</h2>
            <progress className="time-value" max={500} value={currentTime}></progress>
        </div>
    );
}