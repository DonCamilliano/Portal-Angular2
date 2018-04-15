import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TasksListComponent } from "./TasksList/TasksList.component";
import { TaskAddEditComponent } from "./TaskAddEdit/taskAddEdit.component";
import { TasksListService } from "./TasksServices/tasksList.service";
import { TaskService } from "./TasksServices/task.service";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: 'tasks', component: TasksListComponent},
            {path: 'tasks/:id', component: TaskAddEditComponent}
        ]),
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatInputModule, 
        MatButtonModule,
        MatSelectModule,
        MatIconModule
    ],
    declarations: [
        TasksListComponent,
        TaskAddEditComponent
    ],
    providers: [
        TasksListService,
        TaskService
    ]
})

export class TasksModule {
}