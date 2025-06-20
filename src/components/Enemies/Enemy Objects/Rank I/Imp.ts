import { Enemy } from "../Enemy";
import IMP_IMG from "../../Enemy Images/Imp Enemy.png"
import { PlayerStatController } from "../../../Player Stats/PlayerStatManager/PlayerStatController";

const IMP_INFORMATION = {
        _id: 0,
        _name: "Imp",
        _rank: 0,
        _type: "Infernal",
        _img: IMP_IMG
}

const IMP_ATTRIBUTES = {
    _health: 20,
    _attack: 10,
    _defense: 2,
}

export class Imp extends Enemy{
    
    constructor(){
        super(IMP_INFORMATION,IMP_ATTRIBUTES);
    }
    Act(): void {
        
    }
    OnDeath(): void {
        // Do nothing
    }

    AttackAction(playerStatController: PlayerStatController): void {
        playerStatController.DamageHandler(this.Attack);// Deals damage to the player
    }

    DamageHandler(incomingDamage: number): void {
        let reducedDamage = incomingDamage - this.Defense;// Reduce incoming damage by this enemy's defense stat
        reducedDamage = reducedDamage >=0 ? reducedDamage : 0;// Prevents reduced damage from being negative and therefore treated as healing
        this.Health -= reducedDamage;// Reduces this enemies health by the reduced damage calculated above
    }
}