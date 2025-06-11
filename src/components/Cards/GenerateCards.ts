import { PlayerStatController } from "../Player Stats/PlayerStatManager/PlayerStatController";
import { Guard } from "./Battle Cards/Guard";
import { Card } from "./Card";

export class CardGenerator{

    AllCards : Card[];

    private findCard(id: number): [success: boolean,value: Card]{
        // This function receives an id and returns a tuple
        // This tuple is has a "success" boolean that is true if there was a card in the array
        // or false if there was no card in the array
        // The second element in the array is the card itself, which defaults to "Guard" when it is not found
        const protoCard = this.AllCards.find(card=>card.ID==id);// Looks through an array to find an element that matches the comparison of ID's
        
        if(protoCard != undefined)
        {
            const card = Object.create(protoCard);
            return [true,card];
        }
        else
            return [false,new Guard(this.playerStatController)] 
    }

    public GenerateCards(cardIDs: number[]): Card[]{
    // This function receives an array of id and will create an array of cards based on the received values. Any ID's that don't exist will be ignored!
    let cards: Card[] = []; // Creates an empty array
    cardIDs.forEach(id => {
        const [success,card] = this.findCard(id);
        if (success)
            cards.push(card);
    });
    return cards;// Returns the array
}
    
    constructor(
        private readonly playerStatController : PlayerStatController){
            this.AllCards = // Create all cards that will be played in the game here as prototypes, they shall be made into individual instances using the Generate Cards function
            [
                new Guard(this.playerStatController),
            ]
    }
}