import { PlayerStat } from "./PlayerStat";

export class PlayerHealthStat extends PlayerStat {

    constructor(initialValue: number = 100){
        super({
            _name: "Health",
            _value: initialValue
        });
    }
}