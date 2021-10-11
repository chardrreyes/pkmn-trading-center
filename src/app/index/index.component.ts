import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardDetails } from '../model/card.model';
import { CardService } from '../shared/card.service';
import { SnackbarService } from '../shared/snackbar.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  columnBreakpoint = 3;
  selectedIndex = 0;
  cardList: CardDetails[] = [];
  urlLength = 0

  constructor(private snackbarService: SnackbarService, private cardService: CardService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.urlLength = this.route.snapshot.url.length;
    if (this.urlLength > 0) {
      this.selectedIndex = 1;
    }
    this.cardList = this.cardService.getAllCard();
  }

  getBreakpoint(event: any) {
    this.columnBreakpoint = (event.target.innerWidth <= 940) ? 2 : 3;
  }

  addToList(card: CardDetails) {
    this.snackbarService.openSnackBar('Card successfully created!', 'Ok');
    this.cardService.addCard(card);
    this.selectedIndex = 0;
  }

  viewCard(id: number) {
    this.router.navigate(['card/' + id]);
  }

  filterList(filter: string) {
    if (filter == 'sold') {
      this.cardList = this.cardService.getAllSoldCard();
    } else if(filter == 'sale') {
      this.cardList = this.cardService.getAllSaleCard();
    } else {
      this.cardList = this.cardService.getAllCard();
    }
  }

  buyCard(id: number, name: string) {
    this.cardService.buyCard(id);
    this.snackbarService.openSnackBar(name + ' has been sold.', 'Ok');
    this.cardList = this.cardService.getAllCard();
  }

  routeCreate(event: any) {
    // to change the route base on instruction
    // since im using modular component
    if(event.index == 1) {
      this.router.navigate(['card']);
    } else if(event.index == 0) {
      this.router.navigate(['']);
    }
  
  }
}
