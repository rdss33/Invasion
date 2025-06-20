import { StackController } from "../../Card Stacks/StackController";
import { PlayerStatController } from "../../Player Stats/PlayerStatManager/PlayerStatController";
import { Card } from "../Card"
import { CARD_CONSTANTS } from "../Constants";


const BaseValues = {
    _attack: 0,
    _defense: 0,
    _duration: CARD_CONSTANTS.Duration,
    _drainRate: CARD_CONSTANTS.DrainRate,
    _recoverTime: CARD_CONSTANTS.RecoverTime,
    _recoverRate: CARD_CONSTANTS.RecoverRate
}
export abstract class BattleCard extends Card {

    private _remainingDuration : number = 0; // Initial value

    private _remainingRecoverTime : number = 0; // Initial value

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

    
    public get RemainingRecoverTime() : number {
        return this._remainingRecoverTime;
    }

    
    public get RecoverRate() : number {
        return this.Attributes._recoverRate;
    }
    
    

    constructor(
         Information: {
            _name: string, 
            _type: string,
            _rank: string, 
            _img: string,
            _id: number,
         },
         private readonly Attributes: {
            _attack: number,
            _defense: number,
            _duration: number,
            _drainRate: number,
            _recoverTime: number,
            _recoverRate: number
         } = BaseValues,
    ){
        super(Information);
    }
    Play(_playerStatController: PlayerStatController): void {
        // Children may override this method to add "On Play" effects
        this._remainingDuration = this.Duration;// Sets for how long the card will stay active
        this.Active(_playerStatController);// Activates the card this round
    }
    Active(_playerStatController: PlayerStatController): void {
        // This is the cards basic functionality while active
        this.AddStat("Attack",this.Attack,_playerStatController);
        this.AddStat("Defense",this.Defense,_playerStatController);
    }
    Exhaust(_playerStatController: PlayerStatController, stackController: StackController): void {
        this._remainingRecoverTime = this.Attributes._recoverTime; // Sets the recover time to be equal to the card's recover time
        stackController.ExhaustCard(this);// Exhaust this card
        // Children may override this method to add "On Exhaust" effects
    }
    Recover(_playerStatController: PlayerStatController, stackController: StackController): void {// This function is responsible for timing the card's recovery, children my override this method to add "on recovering" effects
        if(this._remainingRecoverTime<=0)// If timer is over
            stackController.RecoverCard(this);// Recover the card back to the deck stack
        this._remainingRecoverTime -= this.RecoverRate;// Reduces the remaining time by the recover rate
    }
    Countdown(_playerStatController : PlayerStatController, stackController : StackController) : void {
        // Children may override this method to add "On Countdown" effects
        if(this._remainingDuration<=0){// When the card's remaining duration is over
            this.Exhaust(_playerStatController, stackController);// Exhaust this card, moving it to the discard stack
        } else {
            this.Active(_playerStatController);// If there is still some duration left, call the card's active effect
        }
        this._remainingDuration-=this.DrainRate; // Reduces remaining duration by the drain rate
    }
    AddStat(statName: string, statValue : number, playerStatController: PlayerStatController):void{
        const accValue = playerStatController.getStatChangeAccumulator(statName);
        const newPair = {name: statName, value: accValue+statValue}
        playerStatController.setStatChangeAccumulator(newPair);
    }
    
}
