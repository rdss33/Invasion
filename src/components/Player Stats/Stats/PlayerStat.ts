export class PlayerStat{
 
    public get Name() : string {
        return this.Information._name
    }

    public get Value() : number {
        return this.Information._value
    }

    
    public set Value(v : number) {
        this.Information._value = v;
    }
    

    constructor( 
        private readonly Information: {
            _name: string,
            _value: number,
        }
    ){
       
    }
}