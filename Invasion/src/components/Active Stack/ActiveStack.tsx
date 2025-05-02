import React from "react";
import { Card } from "../../Card";

interface ICardTrackProps {
    _card: Card;
}
export default function CardTrack({_card}: Readonly<ICardTrackProps>){

    return(
        <div>
            <img src={_card.getImg()} alt="" />
        </div>
    )
}