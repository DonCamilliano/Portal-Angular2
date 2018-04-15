import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IArticle } from './Iarticle';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticlesListService {
    private _articlesListUrl = 'http://localhost:3000/articlesList';

    constructor(private _http: HttpClient) {}

    getArticles(): Observable<IArticle[]>  {
        return this._http.get<IArticle[]>(this._articlesListUrl)
            .catch(this.handleError)
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}