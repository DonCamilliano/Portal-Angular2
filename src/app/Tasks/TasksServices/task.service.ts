import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ITask } from "../ITask";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
    private _tasksListUrl = "http://localhost:3000/tasks";
    headers = { 
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };

    constructor(private _http: HttpClient) {}

    getTask(id: number): Observable<ITask> {
        return this._http.get<ITask>(this._tasksListUrl + "/" + id)
    }

    updateTask(id: number, data: object): Observable<ITask> {
        return this._http.put<ITask>(this._tasksListUrl + "/" + id, JSON.stringify(data), this.headers)
            .catch(this.handleError)
    }

    addTask(data: Object): Observable<ITask> {
        return this._http.post<ITask>(this._tasksListUrl, data, this.headers)
            .catch(this.handleError)
    }

    deleteTask(id: number): Observable<ITask> {
        return this._http.delete<ITask>(this._tasksListUrl + "/" + id, this.headers)
            .catch(this.handleError)
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
    
}