import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { CardDetails } from '../model/card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../shared/card.service';
import { SnackbarService } from '../shared/snackbar.service';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss']
})
export class CardEditComponent implements OnInit {
  @Output() cardCreationEvent = new EventEmitter<CardDetails>();
  cardForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    owner: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    image: new FormControl(''),
  });
  isExisted = false;
  cardId = 0;

  constructor(private snackBarService: SnackbarService, private route: ActivatedRoute, private cardService: CardService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (route) => {
        if(route) {
          // check if card is existing
          const card: CardDetails = this.cardService.getCard(route.id);
          this.isExisted = (card.id > 0) ? true : false;
          if (!this.isExisted) {
            this.snackBarService.openSnackBar('Card doesnt exist. Please create.', 'Ok');
            this.cardId = route.id;
          } else {
            this.cardForm = new FormGroup({
              id: new FormControl(card.id,[Validators.required]),
              name: new FormControl(card.name,[Validators.required]),
              owner: new FormControl(card.owner,[Validators.required]),
              price: new FormControl(card.price,[Validators.required]),
              image: new FormControl(card.image),
              isSold: new FormControl(card.isSold)
            });
          }
        }
      });
  }

  updateCard() {
    const cardDetails = this.cardForm.value;
    this.cardService.updateCard(cardDetails.id, cardDetails);
    this.snackBarService.openSnackBar('Card has been successfully updated.', 'Ok');
    this.router.navigate(['']);
  }

}
