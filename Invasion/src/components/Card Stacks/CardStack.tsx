import { Card } from "../Cards/Card";
import "./CardStack.css"

interface IStackProps {
    stackName: string,
    currentStack: Card[];
}

export default function CardStack({currentStack = [], stackName}: Readonly<IStackProps>){
    return(
        <div className="stack-group">
            <h2 className="stack-title">{stackName}</h2>
            <div className="stack-displayer">
                {currentStack.map((card,index)=> <img key={card.ID+index} src={card.Img} alt="Icon representing unique unit" />)}
            </div>
        </div>
    )
}