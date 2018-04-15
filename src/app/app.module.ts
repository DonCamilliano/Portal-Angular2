import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ArticlesListComponent } from './articles/articlesList.component';
import { ArticleDetailsComponent } from './articles/articleDetails.component';
import { ArticlesListService } from './articles/articlesList.serivce';
import { ArticleService } from './articles/article.service';
import { RatingStarsComponent } from './shares/rating.component';
import { TasksModule } from './Tasks/Tasks.module';
import { ProjectsModule } from './Projects/Projects.module';


@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ArticleDetailsComponent,
    RatingStarsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path:'articles', component: ArticlesListComponent },
      { path:'articles/:id', component: ArticleDetailsComponent }
    ]),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    TasksModule,
    ProjectsModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [ArticlesListService, ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
