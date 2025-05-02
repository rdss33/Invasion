export class Card {
    constructor(
        private readonly information: {
            _name: string, 
            _type: string, 
            _img: string,
            }
    ){}
    
    getName(): string {
        return this.information._name;
    }
    getType(): string{
        return this.information._type;
    }
    getImg(): string{
        return this.information._img;
    }
    
}