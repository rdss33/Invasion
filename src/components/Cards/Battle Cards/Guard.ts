import { BattleCard } from "./Battle Card";
import { CARD_CONSTANTS } from "../Constants";
import GuardIMG from "../Card Images/Guard Card.png"

const GuardInformation = {
    _id: 0,
    _name: "Guard",
    _rank: "Starter", 
    _type: "Defensive", 
    _img: GuardIMG,
}
const GuardAttributes = {
    _attack: 2,
    _defense: 5,
    _duration: CARD_CONSTANTS.Duration,
    _drainRate: CARD_CONSTANTS.DrainRate,
    _recoverTime: CARD_CONSTANTS.RecoverTime,
    _recoverRate: CARD_CONSTANTS.RecoverRate
}

export class Guard extends BattleCard {
    constructor(){
        super(GuardInformation,GuardAttributes);
    }
}


