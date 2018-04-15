import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { IProjects } from "../IProjects";
import { IProject } from "../IProject";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProjectsListService {
    private _projectsListUrl = "http://localhost:3000/projects-list";
    headers = { 
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };

    constructor(private _http: HttpClient) {}

    getProjects(): Observable<IProjects> {
        return this._http.get<IProjects>(this._projectsListUrl)
            .catch(this.handleError)
    }

    updateProjectsList(id: number,projectsListData): Observable<IProjects> {
        return this._http.put<IProjects>(this._projectsListUrl + '/' + id, projectsListData, this.headers)
            .catch(this.handleError)
    }

    addProjectsList(data: Object): Observable<IProject> {
        return this._http.post<IProject>(this._projectsListUrl, data, this.headers)
            .catch(this.handleError)
    }

    deleteProjectsList(id: number): Observable<IProject> {
        return this._http.delete<IProject>(this._projectsListUrl + "/" + id, this.headers)
            .catch(this.handleError)
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }

}