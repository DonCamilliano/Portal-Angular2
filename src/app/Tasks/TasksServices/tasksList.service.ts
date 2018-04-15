import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ITasks } from "../ITasks";
import { ITask } from "../ITask";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class TasksListService {
    private _tasksListUrl = "http://localhost:3000/tasks-list";
    headers = { 
        headers: new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    };

    constructor(private _http: HttpClient) {}

    getTasks(): Observable<ITasks> {
        return this._http.get<ITasks>(this._tasksListUrl)
            .catch(this.handleError)
    }

    updateTaskList(id: number,taskListData): Observable<ITasks> {
        return this._http.put<ITasks>(this._tasksListUrl + '/' + id, taskListData, this.headers)
            .catch(this.handleError)
    }

    addTaskList(data: Object): Observable<ITask> {
        return this._http.post<ITask>(this._tasksListUrl, data, this.headers)
            .catch(this.handleError)
    }

    deleteTaskList(id: number): Observable<ITask> {
        return this._http.delete<ITask>(this._tasksListUrl + "/" + id, this.headers)
            .catch(this.handleError)
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }

}