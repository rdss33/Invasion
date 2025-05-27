import { Card } from "../Card";

interface IStackProps {
    currentStack: Card[];
}

export default function CardStack({currentStack = []}: Readonly<IStackProps>){
    return(
        <div>
            {currentStack[0] != null ? <img src={currentStack[0].Img} alt="" /> : null}
        </div>
    )
}