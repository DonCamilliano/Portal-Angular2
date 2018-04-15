import { Component, OnInit } from '@angular/core';
import { ArticlesListService } from './articlesList.serivce';
import { IArticlesList } from './IarticlesList';

@Component({
    templateUrl: './articlesList.component.html',
    providers: [ArticlesListService]
})

export class ArticlesListComponent implements OnInit {
  errorMessage: string;
  articles: IArticlesList[];
  filteredArticles: IArticlesList[];

  constructor(private _articlesListService: ArticlesListService) {}
  
  ngOnInit(): void {
    this._articlesListService.getArticles()
        .subscribe(articles => {
            this.articles = articles,
            this.filteredArticles = articles
            },
            error => this.errorMessage= <any>error)
  }

  _filter: string;
  get filter(): string {
      return this._filter;
  }
  set filter(value: string) {
      this._filter = value;
      this.filteredArticles = this.filter ? this.performFilter(this.filter) : this.articles;
  }

  performFilter(value: string): IArticlesList[] {
      value = value.toLocaleLowerCase();
      return this.articles.filter((article: IArticlesList) =>
          article.title.toLocaleLowerCase().indexOf(value) !== -1)
  }

  
}