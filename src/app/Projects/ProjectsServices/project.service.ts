import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { IProject } from "../IProject";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {
    private _ProjectsListUrl = "http://localhost:3000/projects";
    headers = { 
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };

    constructor(private _http: HttpClient) {}

    getProject(id: number): Observable<IProject> {
        return this._http.get<IProject>(this._ProjectsListUrl + "/" + id)
    }

    updateProject(id: number, data: object): Observable<IProject> {
        return this._http.put<IProject>(this._ProjectsListUrl + "/" + id, JSON.stringify(data), this.headers)
            .catch(this.handleError)
    }

    addProject(data: Object): Observable<IProject> {
        return this._http.post<IProject>(this._ProjectsListUrl, data, this.headers)
            .catch(this.handleError)
    }

    deleteProject(id: number): Observable<IProject> {
        return this._http.delete<IProject>(this._ProjectsListUrl + "/" + id, this.headers)
            .catch(this.handleError)
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
    
}