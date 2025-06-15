import { StackController } from "../../Card Stacks/StackController";
import { PlayerStatController } from "../../Player Stats/PlayerStatManager/PlayerStatController";
import { Card } from "../Card"
import { CARD_CONSTANTS } from "../Constants";


const BaseValues = {
    _attack: 0,
    _defense: 0,
    _duration: CARD_CONSTANTS.Duration,
    _drainRate: CARD_CONSTANTS.DrainRate
}
export abstract class BattleCard extends Card {

    private _remainingDuration : number = 0; // Initial value

    public get Attack() : number {
        return this.Attributes._attack;
    }

    public get Defense() : number {
        return this.Attributes._defense;
    }
    
    public get Duration() : number {
        return this.Attributes._duration;
    }

    
    public get DrainRate() : number {
        return this.Attributes._drainRate
    }
    

    public get RemainingDuration() : number{
        return this._remainingDuration;
    }


    constructor(
         Information: {
            _name: string, 
            _type: string, 
            _img: string,
            _id: number,
         },
         private readonly Attributes: {
            _attack: number,
            _defense: number,
            _duration: number,
            _drainRate: number
         } = BaseValues,
    ){
        super(Information);
    }
    Play(_playerStatController: PlayerStatController): void {
        // Children may override this method to add "On Play" effects
        this._remainingDuration = this.Duration;
    }
    Active(_playerStatController: PlayerStatController): void {
        // This is the cards basic functionality while active
        this.AddStat("Attack",this.Attack,_playerStatController);
        this.AddStat("Defense",this.Defense,_playerStatController);
    }
    Exhaust(_playerStatController: PlayerStatController, stackController: StackController): void {
        stackController.ExhaustCard(this);// Exhaust this card
        // Children may override this method to add "On Exhaust" effects
    }
    Countdown(_playerStatController : PlayerStatController, stackController : StackController) : void {
        // Children may override this method to add "On Countdown" effects
        if(this._remainingDuration<=0){
            this.Exhaust(_playerStatController, stackController);
        } else {
            this.Active(_playerStatController);
        }
        this._remainingDuration-=this.DrainRate; // Reduces remaining duration by the drain rate
    }
    AddStat(statName: string, statValue : number, playerStatController: PlayerStatController):void{
        const accValue = playerStatController.getStatChangeAccumulator(statName);
        const newPair = {name: statName, value: accValue+statValue}
        playerStatController.setStatChangeAccumulator(newPair);
    }
}
