import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { QueryRes } from '../models/queryRes';
import { Film } from '../models/film';
import { DetailedFilm } from '../models/detailedFilm';
import { EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearcherService {
  detailsFilm: DetailedFilm = new DetailedFilm()
  films:Film[] = []

  @Output() filmsUpdated: EventEmitter<Film[]> = new EventEmitter();
  filmClickedSubject:Subject<any> = new Subject()

  constructor(private http:HttpClient, private router: Router) { }

  getFilms() {
    return this.films;
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
    this.films = []
    let queryUrl = "https://www.omdbapi.com/?apikey=71a9a541&type=movie&s=" 
      + query.replace(" ", "+").toLowerCase();
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
    this.films = queryFilms;
    this.filmsUpdated.emit(this.films);
  }
}
