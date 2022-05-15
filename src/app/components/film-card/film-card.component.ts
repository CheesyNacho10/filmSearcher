import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss'],
})
export class FilmCardComponent implements OnInit {

  @Input() film:Film = new Film();

  constructor() { }

  ngOnInit() {}

}
