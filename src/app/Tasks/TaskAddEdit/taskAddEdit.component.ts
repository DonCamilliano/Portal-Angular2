import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ITask } from '../ITask';
import { ITasks } from "../ITasks";
import { TaskService } from "../TasksServices/task.service";
import { TasksListService } from "../TasksServices/tasksList.service";
import { ProjectsListService } from "../../Projects/ProjectsServices/projectsList.service";
import { IProjects } from "../../Projects/IProjects";

@Component({
    templateUrl: 'taskAddEdit.component.html'
})

export class TaskAddEditComponent implements OnInit {
    task: ITask;
    tasks: ITasks;
    tasksLength: number;
    selectedProjectId: number;
    projects: IProjects;
    toggleEdit: boolean = false;
    validateTitle: boolean = false;
    
    constructor(private _taskAddEditService: TaskService,
        private _tasksListService: TasksListService,
        private _projectListService: ProjectsListService,
        private _route: ActivatedRoute,
        private _router: Router) {}

    ngOnInit(): void {
        const param = this._route.snapshot.paramMap.get('id');
        if (param) {
            const id = +param;
            if (id > 0) {
                this.getTask(id);
            } else if (id === 0) {
                this.toggleEdit = true;
                this.task = {
                    id: 0,
                    taskTitle: "",
                    taskDescription: "",
                    taskAuthor: "",
                    projectAssignedId: 0
                }
            } else {
                this._router.navigate(['/tasks']);
            }
        }
    }

    getTask(taskId: number) {
        this._taskAddEditService.getTask(taskId)
            .subscribe(
                task => this.task = task
            )
        this._projectListService.getProjects()
            .subscribe(
                projects => this.projects = projects
            )
    }

    editTask(): void {
        this.toggleEdit = !this.toggleEdit;
    }
    
    selectProj(val) {
        this.selectedProjectId = val;
    }

    saveTask(taskId: number) {
        if (this.task.taskTitle.length >= 3) {
            let taskData: object = {
                taskTitle: this.task.taskTitle,
                taskDescription: this.task.taskDescription,
                taskAuthor: this.task.taskAuthor,
                projectAssignedId: this.selectedProjectId
            }
            let taskListdata: object = {
                taskTitle: this.task.taskTitle
            }
            if (taskId != 0) {
                let taskData: object = {
                    id: taskId,
                    taskTitle: this.task.taskTitle,
                    taskDescription: this.task.taskDescription,
                    taskAuthor: this.task.taskAuthor,
                    projectAssignedId: this.selectedProjectId
                }
                let taskListdata: object = {
                    id: taskId,
                    taskTitle: this.task.taskTitle
                }
                this._taskAddEditService.updateTask(taskId,taskData)
                    .subscribe()
                this._tasksListService.updateTaskList(taskId,taskListdata)
                    .subscribe()
            } else if (taskId === 0) {
                this._taskAddEditService.addTask(taskData)
                    .subscribe()
                this._tasksListService.addTaskList(taskListdata)
                    .subscribe()
            }
            this.toggleEdit = !this.toggleEdit;
        } else {
            this.validateTitle = true;
        }
    }
}