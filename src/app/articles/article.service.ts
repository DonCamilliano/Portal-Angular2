import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IArticle } from './Iarticle';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ArticleService {
    private _articleUrl = 'http://localhost:3000/articles';

    constructor(private _http: HttpClient) {}

    getArticles(): Observable<IArticle[]>  {
        return this._http.get<IArticle[]>(this._articleUrl)
            .catch(this.handleError)
    }

    getArticle(id: number): Observable<IArticle> {
        return this.getArticles()
            .map((articles: IArticle[]) => articles.find(p => p.id === id));
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}