import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Film } from 'src/app/models/film';
import { SearcherService } from 'src/app/services/searcher.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss'],
})
export class FilmsListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  
  films: Film[] = []

  constructor(private searcherService:SearcherService) {
    this.searcherService.filmsUpdated.subscribe(
      (films) => this.onUpdate(films)
    );
  }

  ngOnInit() {
    this.films = this.searcherService.getFilms();
  }

  onUpdate(films: Film[]) {
    this.films = films;
  }

  loadData(event) {
    setTimeout(() => {
      this.searcherService.moreFilms()
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.films.length === 500) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
