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
    console.log(event.detail.value)
    this.searcherService.resolveQuery(event.detail.value)
  }
}
