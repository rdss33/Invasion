import { StackController } from "../Card Stacks/StackController"
import { PlayerStatController } from "../Player Stats/PlayerStatManager/PlayerStatController"

export abstract class Card {

    public get Name() : string {
        return this.information._name
    }

    public get Img() : string {
        return this.information._img
    }
    
    public get Type() : string {
        return this.information._type
    }

    
    public get ID() : number {
        return this.information._id
    }
    
    public get Rank(): string{
        return this.information._rank
    }

    constructor(
        private readonly information: {
            _id: number,
            _name: string,
            _rank: string, 
            _type: string, 
            _img: string,
            },
    ){}
    
    abstract Play(playerStatController: PlayerStatController, stackController : StackController) : void;
    abstract Active(playerStatController: PlayerStatController, stackController : StackController) : void;
    abstract Exhaust(playerStatController: PlayerStatController, stackController : StackController) : void;
    abstract Recover(playerStatController: PlayerStatController, stackController : StackController) : void;
    abstract Countdown(playerStatController: PlayerStatController, stackController : StackController) : void;
}