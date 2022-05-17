import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';
import { SearcherService } from 'src/app/services/searcher.service';

@Component({
  selector: 'app-detailed-film-card',
  templateUrl: './detailed-film-card.component.html',
  styleUrls: ['./detailed-film-card.component.scss'],
})
export class DetailedFilmCardComponent implements OnInit {
  film:Film = new Film();

  constructor(private searcherService: SearcherService) {}

  ngOnInit() {
    this.film = this.searcherService.detailsFilm
  } 

}
