import { Injectable } from "@angular/core";
import { CardDetails } from "../model/card.model";

@Injectable({providedIn: 'root'})
export class CardService {

  // default list
  cardList: CardDetails[] = [
    {
      id: 1,
      name: 'Charizard',
      owner: 'Red',
      price: 15,
      image: '../../assets/ygback.jpg',
      isSold: false
    },
    {
      id: 2,
      name: 'Dark Magician',
      owner: 'Yugi',
      price: 25,
      image: '../../assets/ygback.jpg',
      isSold: false
    },
    {
      id: 3,
      name: 'Ylvetal',
      owner: 'Ash',
      price: 55,
      image: '../../assets/ygback.jpg',
      isSold: true
    }
  ]

  constructor() {}

  // just a demonstration for api calls
  // since it has no api, I will use basic return
  getAllCard() {
      return this.cardList;
  }

  getCard(id: number) {
    // get card from api
    // then return
    let card: CardDetails = {
      id: -1,
      name: '',
      owner: '',
      image: '',
      price: 0,
      isSold: false
    };
    this.cardList.forEach(element => {
      if(element.id == id) {
        card.id = element.id;
        card.name = element.name;
        card.owner = element.owner;
        card.price = element.price;
        card.image = element.image;
        card.isSold = element.isSold;
      }
    });

    return card;
  }

  getAllSoldCard() {
    const card: CardDetails[] = [];
    this.cardList.forEach(element => {
      if(element.isSold) {
        card.push(element);
      }
    });
    return card;
  }

  getAllSaleCard() {
    const card: CardDetails[] = [];
    this.cardList.forEach(element => {
      if(!element.isSold) {
        card.push(element);
      }
    });
    return card;
  }

  addCard(card: CardDetails) {
    this.cardList.push(
      {
        id: card.id,
        name: card.name,
        owner: card.owner,
        price: card.price,
        image: card.image,
        isSold: card.isSold
      }
    )
  }

  updateCard(cardId: number, cardDetails: CardDetails) {
    this.cardList.forEach(element => {
      if(element.id == cardId) {
        element.name = cardDetails.name;
        element.owner = cardDetails.owner;
        element.price = cardDetails.price;
      }
    });
  }

  generateId() {
    let id = this.cardList.length + 1;
    this.cardList.forEach(element => {
      if (element.id == id) {
        id++;
      }
    });
    return id;
  }

  buyCard(id: number) {
    this.cardList.forEach(element => {
      if(element.id == id) {
        element.isSold = true;
      }
    });
  }
}