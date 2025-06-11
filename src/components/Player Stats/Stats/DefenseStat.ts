import { PlayerStat } from "./PlayerStat";

export class PlayerDefenseStat extends PlayerStat {

    constructor(initialValue: number = 0){
        super({
            _name: "Defense",
            _value: initialValue
        });
    }
}