import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { IProject } from '../IProject';
import { IProjects } from "../IProjects";
import { ProjectService } from "../ProjectsServices/project.service";
import { ProjectsListService } from "../ProjectsServices/projectsList.service";

@Component({
    templateUrl: 'projectAddEdit.component.html'
})

export class ProjectAddEditComponent implements OnInit {
    project: IProject;
    projects: IProjects;
    toggleEdit: boolean = false;
    validateTitle: boolean = false;
    
    constructor(private _ProjectAddEditService: ProjectService,
        private _ProjectsListService: ProjectsListService,
        private _route: ActivatedRoute,
        private _router: Router) {}

    ngOnInit(): void {
        const param = this._route.snapshot.paramMap.get('id');
        if (param) {
            const id = +param;
            if (id > 0) {
                this.getProject(id);
            } else if (id === 0) {
                this.toggleEdit = true;
                this.project = {
                    id: 0,
                    projectTitle: "",
                    projectDescription: "",
                    projectAuthor: ""
                }
            } else {
                this._router.navigate(['/projects']);
            }
        }
    }

    getProject(ProjectId: number) {
        this._ProjectAddEditService.getProject(ProjectId)
            .subscribe(
                project => this.project = project
            )
    }

    editProject(): void {
        this.toggleEdit = !this.toggleEdit;
    }

    saveProject(ProjectId: number) {
        if (this.project.projectTitle.length >= 3) {
            let projectData: object = {
                projectTitle: this.project.projectTitle,
                projectDescription: this.project.projectDescription,
                projectAuthor: this.project.projectAuthor,
            }
            let projectListData: object = {
                projectTitle: this.project.projectTitle
            }
            if (ProjectId != 0) {
                let projectData: object = {
                    id: ProjectId,
                    projectTitle: this.project.projectTitle,
                projectDescription: this.project.projectDescription,
                projectAuthor: this.project.projectAuthor,
                    }
                let projectListData: object = {
                    id: ProjectId,
                    projectTitle: this.project.projectTitle
                }
                this._ProjectAddEditService.updateProject(ProjectId,projectData)
                    .subscribe()
                this._ProjectsListService.updateProjectsList(ProjectId,projectListData)
                    .subscribe()
            } else if (ProjectId === 0) {
                this._ProjectAddEditService.addProject(projectData)
                    .subscribe()
                this._ProjectsListService.addProjectsList(projectListData)
                    .subscribe()
            }
            this.toggleEdit = !this.toggleEdit;
        } else {
            this.validateTitle = true;
        }
    }
}