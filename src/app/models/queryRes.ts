import { Film } from "./film";

export class QueryRes {
    Response:boolean = false;
    Search:Film[] = [];
    totalResults:number = 0;
}