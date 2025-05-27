import { PlayerStat } from "./PlayerStat";

export class PlayerAttackStat extends PlayerStat {

    constructor(initialValue: number = 0){
        super({
            _name: "Attack",
            _value: initialValue
        });
    }
}