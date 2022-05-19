import { Component, OnInit } from '@angular/core';
import { SearcherService } from 'src/app/services/searcher.service';

@Component({
  selector: 'app-film-searchbar',
  templateUrl: './film-searchbar.component.html',
  styleUrls: ['./film-searchbar.component.scss'],
})
export class FilmSearchbarComponent implements OnInit {

  constructor(private searcherService: SearcherService) {

  }

  ngOnInit() {}
  
  onSearch(event) {
    this.searcherService.filmsPage = 0;
    this.searcherService.resolveUserQuery(event.detail.value)
  }
}
