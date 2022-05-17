import { Component, Input, OnInit, Output } from '@angular/core';
import { Film } from 'src/app/models/film';
import { Router } from '@angular/router';
import { SearcherService } from 'src/app/services/searcher.service';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent implements OnInit {

  @Input() film:Film = new Film();

  constructor(private searcherService:SearcherService, 
    private router: Router) { }

  ngOnInit() {}

  onClick(event) {
    this.searcherService.onDetails(this.film)
    this.router.navigateByUrl('/details');
  }
}
