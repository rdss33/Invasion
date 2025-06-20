export abstract class Enemy{

    private currentHealth = this.Attributes._health;
    private currentAttack = this.Attributes._attack;
    private currentDefense = this.Attributes._defense;
    
    public get ID() : number {
        return this.Information._id;
    }
    
    
    public get Name() : string {
        return this.Information._name;
    }
  
    
    public get Rank() : number {
        return this.Information._rank;
    }
    
    
    public get Type() : string {
        return this.Information._type;
    }
    
    
    public get IMG() : string {
        return this.Information._img;
    }
    
    
    public get Health() : number {
        return this.currentHealth;
    }
    
    public set Health(v : number) {
        this.currentHealth = v;
    }
    

    public get Attack() : number {
        return this.currentAttack;
    }

    
    public set Attack(v : number) {
        this.currentAttack = v;
    }
    
    
    public get Defense() : number {
        return this.currentDefense;
    }

    
    public set Defense(v : number) {
        this.currentDefense = v;
    }

    constructor(
        private readonly Information: {
            _id: number,
            _name: string,
            _rank: number,
            _type: string,
            _img: string
        },
        private readonly Attributes: {
            _health: number,
            _attack: number,
            _defense: number,
        }
    ){
        
    }

    abstract Act():void;
    abstract OnDeath():void;
}