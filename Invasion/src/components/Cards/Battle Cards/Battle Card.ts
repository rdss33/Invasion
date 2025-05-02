import { Card } from "../Card"
import { CARD_CONSTANTS } from "../Constants";


const BaseValues = {
    Attack: 0,
    Defense: 0,
    Duration: CARD_CONSTANTS.Duration
}
export class BattleCard extends Card {
    constructor(
         private readonly Information: {
            _name: string, 
            _type: string, 
            _img: string,
         },
         private Attributes: {
            Attack: number,
            Defense: number,
            Duration: number
         } = BaseValues
    ){
        super(Information);
    }
    attack(): number{
        return this.Attributes.Attack;
    }
    defense(): number{
        return this.Attributes.Defense;
    }
    duration(): number{
        return this.Attributes.Duration;
    }}
