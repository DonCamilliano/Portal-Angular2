import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IArticle } from "./Iarticle";
import { ArticleService } from "./article.service";


@Component({
    templateUrl: './articleDetails.component.html'
})

export class ArticleDetailsComponent implements OnInit {
    article: IArticle;
    errorMessage: string;
    toggleEdit: boolean = false;

    constructor(private _route: ActivatedRoute, private _articleService: ArticleService) {}

    ngOnInit() {
        let param = +this._route.snapshot.paramMap.get('id');
        if (param) {
            const id =+param;
            this.getArticles(id);
        }
    }
    
    getArticles(id: number) {
        this._articleService.getArticle(id)
            .subscribe(
                article => this.article = article,
                error => this.errorMessage = <any>error
            );
    }

    editArticle(): void {
        this.toggleEdit = !this.toggleEdit;
    }
    
}