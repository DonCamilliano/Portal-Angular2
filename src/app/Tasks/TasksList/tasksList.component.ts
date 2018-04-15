import { Component, OnInit } from '@angular/core';
import { ITasks } from '../ITasks';
import { TasksListService } from '../TasksServices/tasksList.service';
import { TaskService } from '../TasksServices/task.service';

@Component({
    templateUrl: './tasksList.component.html',
    providers: [TasksListService]
})

export class TasksListComponent implements OnInit {
    tasks: ITasks;

    constructor(private _taskAddEditService: TaskService,
                private _tasksListService: TasksListService) {}

    ngOnInit(): void {
          this.loadData()  
    }

    loadData() {
        this._tasksListService.getTasks()
        .subscribe(tasks => {
            this.tasks = tasks
        })
    }

    deleteTask(id) {
        this._tasksListService.deleteTaskList(id)
            .subscribe()
        this._taskAddEditService.deleteTask(id)
            .subscribe(
                () => this.loadData()
            )
    }

}