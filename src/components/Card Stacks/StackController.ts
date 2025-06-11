import { Card } from "../Cards/Card";
import { PlayerStatController } from "../Player Stats/PlayerStatManager/PlayerStatController";

export class StackController{
    PlayCard(card: Card){
        card.Play(this.playerStatController, this);
        this.TransferStacks(this.handleDeck,this.handleActiveStack,card);
    }
    ExhaustCard(card:Card){
        this.TransferStacks(this.handleActiveStack,this.handleDiscard,card);
    }
    RecoverCard(card:Card){
        this.TransferStacks(this.handleDiscard,this.handleDeck,card);
    }
    TransferStacks(handleStack1: React.Dispatch<React.SetStateAction<Card[]>>,handleStack2: React.Dispatch<React.SetStateAction<Card[]>>, card: Card){
        if (card===undefined)
            return false;
        handleStack1((prevState)=>{
            let newStack1 = [...prevState];
            const index = newStack1.indexOf(card);// Verifies card index, returns -1 if it doesn't exist
            if(index!=-1){
                newStack1.splice(index,1); // Removes card to be played
            }
            return newStack1;
        });
        handleStack2((prevState)=>{
            let newStack2 = [...prevState];
            const duplicateCard = newStack2.includes(card); // Verifies if card has already been added to the array
            if(!duplicateCard)
            {
                newStack2.push(card); // Adds to the end of the array a new card
            }
            return newStack2;
        });
    }
    constructor(
        private readonly handleDiscard : React.Dispatch<React.SetStateAction<Card[]>>,
        private readonly handleActiveStack : React.Dispatch<React.SetStateAction<Card[]>>,
        private readonly handleDeck : React.Dispatch<React.SetStateAction<Card[]>>,
        private readonly playerStatController : PlayerStatController
    ){

    }
}