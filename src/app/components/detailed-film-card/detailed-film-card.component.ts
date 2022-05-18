import { Component, Input, OnInit } from '@angular/core';
import { SearcherService } from 'src/app/services/searcher.service';
import { DetailedFilm } from 'src/app/models/detailedFilm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-film-card',
  templateUrl: './detailed-film-card.component.html',
  styleUrls: ['./detailed-film-card.component.scss'],
})
export class DetailedFilmCardComponent implements OnInit {
  filmDetail:DetailedFilm = new DetailedFilm();

  constructor(private searcherService: SearcherService,
    private router: Router) {
    this.searcherService.filmClickedEvent$.subscribe(
      (detail) => this.onDetail(detail)
    )
  }

  ngOnInit() {
    this.filmDetail = this.searcherService.detailsFilm
    console.log(this.filmDetail)
  } 

  onDetail(detail:DetailedFilm) {
    console.log(detail)
    this.filmDetail = detail;
    this.router.navigateByUrl('/details');
  }
}
