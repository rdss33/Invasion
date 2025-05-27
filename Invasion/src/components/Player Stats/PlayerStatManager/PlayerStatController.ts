import { PlayerStat } from "../Stats/PlayerStat";

export class PlayerStatController{
 
    _statChangeAccumulator : {name: string, value:number}[] = [];

    
    private get BasePlayerStats() : PlayerStat[] {
        return this._basePlayerStats
    }

    private get PlayerStats() : PlayerStat[] {
        return this._playerStats
    }

    getStat(statName : string, statArray: PlayerStat[]):[success: boolean,value: number]{
        const stat = statArray.find(stat => stat.Name===statName); // Verifies if stat exists
        if(stat != undefined){
            return [true,stat.Value] // Returns tuple [success,value] if it worked
        } else {
            return [false,-1]; // Returns tuple [fail,-1] if it worked
        }
    }
    
    private setStat(newStat : {name:string,value:number}, statArray: PlayerStat[], statUpdater: (value: PlayerStat[])=>void):boolean{
        const statIndex = statArray.findIndex(stat => stat.Name===newStat.name); // Verifies if stat exists
        if(statIndex != -1){
            let newStats = [...statArray]; // Makes a copy of the state
            newStats[statIndex].Value = newStat.value; // Mutates the state of the copy
            statUpdater(newStats);
            return true;
        } else {
            return false; // Returns false if stat doesn't exist
        }
    }

    getStatChangeAccumulator(name: string) : number { // Method that returns the current value of an accumulator, given its unique name as a parameter
        const statAccIndex = this._statChangeAccumulator.findIndex(accumulator=> accumulator.name === name);
        if(statAccIndex!=-1){
            return this._statChangeAccumulator[statAccIndex].value; // Already exists, return current value
        } else {
            return 0; // Doesn't yet exist, so returns 0
        }
    }

    setStatChangeAccumulator(v: {name: string, value: number}) { // This property has a public setter to change the value of a specific accumulator, based on a given {key,value} pair
        const statAccIndex = this._statChangeAccumulator.findIndex(accumulator => accumulator.name === v.name)
        if(statAccIndex != -1){
            this._statChangeAccumulator[statAccIndex].value = v.value
        } else {
            this._statChangeAccumulator.push(v);
        }
    }

    UnloadAccumulators():void{// This method is called to update all stats after "Accumulation" is over
        this._statChangeAccumulator.forEach(accumulator => {
            const [baseExists,baseStatValue] = this.getStat(accumulator.name,this.BasePlayerStats);// Tries to access the base value stat with a name that matches the accumulator's name, if that fails then the method returns false and the value is ignored
            if(baseExists)// Unload the accumulator using a base value 
            {
                const newStat = {name: accumulator.name, value: baseStatValue+accumulator.value}// Assembles a new object with the updated stat value
                this.setStat(newStat,this.PlayerStats,this._playerStatsHandler);// Go through each accumulator and add their values to the stat
            } else {// If there is no base value for the stat, use the current stat value as a base, should it exist
                const [statExists,statValue] = this.getStat(accumulator.name,this.PlayerStats);// Tries to access the stat with a name that matches the accumulator's name, if that fails then the method returns false and the value is ignored
                if(statExists)// Unload the accumulator using the current stat value
                {
                    const newStat = {name: accumulator.name, value: statValue+accumulator.value}// Assembles a new object with the updated stat value
                    this.setStat(newStat,this.PlayerStats,this._playerStatsHandler);// Go through each accumulator and add their values to the stat
                }
            }
        });
        this.resetAccumulator();
    }

    

    private resetAccumulator():void{
        this._statChangeAccumulator = []; // Clears the array for then next set of calculations
    }


    constructor(
        private readonly _playerStats: PlayerStat[],
        private readonly _playerStatsHandler: (value: PlayerStat[])=>void,
        private readonly _basePlayerStats: PlayerStat[]
    ){

    }
}