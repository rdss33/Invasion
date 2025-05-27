import React from "react";
import { Card } from "../../Card";

interface IDiscardProps {
    currentDiscard: Card[];
}
export default function Discard({currentDiscard}: Readonly<IDiscardProps>){

    return(
        <div>
            {/* Show back of card here */}
        </div>
    )
}