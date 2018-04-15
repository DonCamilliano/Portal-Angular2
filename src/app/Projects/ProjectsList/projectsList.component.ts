import { Component, OnInit } from '@angular/core';
import { IProjects } from '../IProjects';
import { ProjectsListService } from '../ProjectsServices/projectsList.service';
import { ProjectService } from '../ProjectsServices/project.service';

@Component({
    templateUrl: './ProjectsList.component.html',
    providers: [ProjectsListService]
})

export class ProjectsListComponent implements OnInit {
    projects: IProjects;

    constructor(private _ProjectAddEditService: ProjectService,
                private _ProjectsListService: ProjectsListService) {}

    ngOnInit(): void {
          this.loadData()  
    }

    loadData() {
        this._ProjectsListService.getProjects()
        .subscribe(projects => {
            this.projects = projects
        })
    }

    deleteProject(id) {
        this._ProjectsListService.deleteProjectsList(id)
            .subscribe()
        this._ProjectAddEditService.deleteProject(id)
            .subscribe(
                () => this.loadData()
            )
    }

}