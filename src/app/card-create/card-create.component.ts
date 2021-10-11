import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CardDetails } from '../model/card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../shared/card.service';
import { SnackbarService } from '../shared/snackbar.service';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss']
})
export class CardCreateComponent implements OnInit {
  @Output() cardCreationEvent = new EventEmitter<CardDetails>();
  @Input() cardId = 0;
  cardForm = new FormGroup({
    id: new FormControl(0,[Validators.required]),
    name: new FormControl('',[Validators.required]),
    owner: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    picture: new FormControl(''),
    isSold: new FormControl(false,[Validators.required]),
  });
  isModule = true;
  urlLength = 0;

  constructor(private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private cardService: CardService, public snackBarService: SnackbarService) { }

  ngOnInit(): void {
    // check if user is accessing via module or routes
    this.urlLength = this.route.snapshot.url.length;
    if (this.urlLength > 0) {
      this.isModule = false;
    }
  }

  createCard() {
    if(this.cardForm.valid) {
      let cardValue = this.cardForm.value;
      // check @input for value
      if (this.cardId > 0) {
        cardValue.id = this.cardId;
      } else {
        cardValue.id = this.cardService.generateId();
      }
      console.log(cardValue);
      // check if user is accessing via module or routes
      this.snackBarService.openSnackBar('Card created successfully', 'Ok');
      if (this.isModule) {
        this.cardCreationEvent.emit(cardValue);
      } else {
        this.cardService.addCard(cardValue);
        this.router.navigate(['']);
      }

      this.cardForm.reset();
    } else {
      this.snackBarService.openSnackBar('All field(s) are required', 'Ok');
    }
  }

}
