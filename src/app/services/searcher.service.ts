import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class SearcherService {
  films:Film[] = []

  

  constructor(private http:HttpClient) { }

  resolveQuery(query:string) {
    let queryUrl = "https://www.omdbapi.com/?apikey=71a9a541&type=movie&plot=short&s=" 
      + query.replace(" ", "+").toLowerCase();
    let result;
    this.http.get(queryUrl).subscribe(res => result = res);
    if (!result.Response) {
      return [];
    }
    for (let filmRes in result.Search) {
      let film = new Film();
      //film.title = filmRes.Title;

    }
    return this.films;
  }
}
