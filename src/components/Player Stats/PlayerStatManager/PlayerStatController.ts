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

    getBaseStatValue(name: string) : [success: boolean, value: number]{// Method that returns the base value of a given stat
        const baseStatIndex = this.BasePlayerStats.findIndex(baseStat=>baseStat.Name===name);// If this stat has a base value
        if(baseStatIndex!=-1){//If it exists
            return [true,this.BasePlayerStats[baseStatIndex].Value];// Returns success and the value of the base stat
        } else 
        {
            return [false,0];// Returns fail and value of 0 if there is no base stat
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
        this.PlayerStats.forEach(playerStat=>{
            const [baseExists,baseStatValue] = this.getBaseStatValue(playerStat.Name);// Tries to access this stat's base value, if it exists
            const accumulatorValue = this.getStatChangeAccumulator(playerStat.Name);// Tries to access an accumulator that would change this stats value, will return 0 if there is no accumulator
            const newStat = {name: playerStat.Name, value: (baseExists ? baseStatValue : playerStat.Value) + accumulatorValue}// Assembles a new object with the updated stat value
            this.setStat(newStat,this.PlayerStats,this._playerStatsHandler);// Go through each accumulator and add their values to the stat
        });// Cycles through each stat the player currently has to unload its accumulator
        this.resetAccumulator();// Resets all accumulators
    }

    DamageHandler(incomingDamage : number):void{
        const [defenseExists,playerCurrentDefense] = this.getStat("Defense", this.PlayerStats);// Access the player's Defense value
        if(defenseExists){// If both health and defense stats exists, process damage. They should ALWAYS exist, something major is broken if they don't
            let reducedDamage = incomingDamage - playerCurrentDefense;// This will reduce incoming damage by the players current defense
            reducedDamage = reducedDamage >= 0 ? reducedDamage : 0;// This will prevent damage from turning into healing if defense is high enough
            this.setStatChangeAccumulator({name: "Health", value:-reducedDamage});// Sends the value as a negative to reduce health stat value
        } else { // This will act as a debugging tool to warn the developer that one of the major stats does not exist in the array and which one is missing
            console.log(`Major error! Defense does not exist`);
        }    
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