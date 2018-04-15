import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { ProjectsListComponent } from "./ProjectsList/ProjectsList.component";
import { ProjectAddEditComponent } from "./ProjectAddEdit/ProjectAddEdit.component";
import { ProjectsListService } from "./ProjectsServices/projectsList.service";
import { ProjectService } from "./ProjectsServices/project.service";

@NgModule({
    imports: [
        RouterModule.forChild([
            {path: 'projects', component: ProjectsListComponent},
            {path: 'projects/:id', component: ProjectAddEditComponent}
        ]),
        BrowserModule,
        FormsModule
    ],
    declarations: [
        ProjectsListComponent,
        ProjectAddEditComponent
    ],
    providers: [
        ProjectsListService,
        ProjectService
    ]
})

export class ProjectsModule {
}