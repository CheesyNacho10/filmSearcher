import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { QueryRes } from '../models/queryRes';
import { Film } from '../models/film';
import { DetailedFilm } from '../models/detailedFilm';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearcherService {
  detailsFilm: DetailedFilm = new DetailedFilm();
  films:Film[] = [];
  lastQuery:string = '';
  filmsPage = 0;

  @Output() filmsUpdated: EventEmitter<Film[]> = new EventEmitter();
  filmClickedSubject:Subject<any> = new Subject()

  constructor(private http:HttpClient, private router: Router) { }

  newSearch(query:string) {
    this.filmsPage = 0;
    while (this.filmsPage < 4) {
      this.resolveUserQuery(query);
    }
  }
  
  searchMoreFilms() {
    this.resolveUserQuery(this.lastQuery)
  }

  onDetails(filmId:string) {
    this.resolveDetailedQuery(filmId)
  }

  resolveDetailedQuery(id:string) {
    let queryUrl = "https://www.omdbapi.com/?apikey=71a9a541&plot=long&i="
      + id;
    this.http.get<DetailedFilm>(queryUrl).subscribe(queryRes => {
      if (queryRes.Response) {
        this.detailsFilm = queryRes;
      }
      else {
        this.detailsFilm = new DetailedFilm();
      }
      this.router.navigateByUrl('/details');
      this.filmClickedSubject.next(this.detailsFilm)
    })
  }

  resolveUserQuery(query:string) {
    this.lastQuery = query;
    if (this.filmsPage == 0) this.films = [];
    this.filmsPage += 1;
    let queryUrl = "https://www.omdbapi.com/?apikey=71a9a541&type=movie&s=" 
      + query.replace(" ", "+").toLowerCase()
      + "&page=" + this.filmsPage;
    this.http.get<QueryRes>(queryUrl).subscribe(queryRes => {
      if (queryRes.Response) {
        this.insertFilms(queryRes.Search);
      }
      else {
        this.films = [];
      }
    })
  }

  insertFilms(queryFilms) {
    if (this.filmsPage == 1) {
      this.films = queryFilms;
    }
    else {
      this.films = this.films.concat(queryFilms)
    }
    this.filmsUpdated.emit(this.films);
  }
}
