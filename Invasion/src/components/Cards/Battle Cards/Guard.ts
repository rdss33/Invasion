import { BattleCard } from "./Battle Card";
import { CARD_CONSTANTS } from "../Constants";
import GuardIMG from "../Card Images/Guard Card.png"
import { PlayerStatController } from "../../Player Stats/PlayerStatManager/PlayerStatController";

const GuardInformation = {
    _id: 0,
    _name: "Guard", 
    _type: "Defensive", 
    _img: GuardIMG,
}
const GuardAttributes = {
    _attack: 2,
    _defense: 5,
    _duration: CARD_CONSTANTS.Duration,
    _drainRate: CARD_CONSTANTS.DrainRate,
}

export class Guard extends BattleCard {
    constructor(playerStatController : PlayerStatController){
        super(GuardInformation,GuardAttributes,playerStatController);
    }
}


