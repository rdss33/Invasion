import { BattleCard } from "./Battle Card";
import { CARD_CONSTANTS } from "../Constants";
import GuardIMG from "../Card Images/Guard Card.png"

export const GuardInformation = {
    _name: "Guard", 
    _type: "Defensive", 
    _img: GuardIMG,
}
export const GuardAttributes = {
    Attack: 2,
    Defense: 5,
    Duration: CARD_CONSTANTS.Duration
}

export class Guard extends BattleCard {

}


