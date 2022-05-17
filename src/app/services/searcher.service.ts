import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { QueryRes } from '../models/queryRes';
import { Film } from '../models/film';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearcherService {
  films:Film[] = []
  @Output() filmsUpdated: EventEmitter<Film[]> = new EventEmitter();

  constructor(private http:HttpClient) { }

  getFilms() {
    return this.films;
  }

  resolveQuery(query:string) {
    this.films = []
    let queryUrl = "https://www.omdbapi.com/?apikey=71a9a541&type=movie&plot=short&s=" 
      + query.replace(" ", "+").toLowerCase();
    this.http.get<QueryRes>(queryUrl).subscribe(queryRes => {
      console.log(queryRes)
      if (queryRes.Response) {
        this.insertFilms(queryRes.Search)
      }
      else {
        this.films = []
      }
    })
  }

  insertFilms(queryFilms) {
    this.films = queryFilms;
    this.filmsUpdated.emit(this.films)
    // for (let film in queryFilms) {
    //   this.films.push(film)
    // }
  }
}
