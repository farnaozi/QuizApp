import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizCategoryResolverService } from './shared/resolvers/quiz_category_resolver.service';
import { QuizQuestionsResolverService } from './shared/resolvers/quiz_questions_resolver.service';
import { QuizCanDeactivateGuardService } from './shared/services/quiz-can-deactivate-guard.service';

const routes: Routes = [
  { path:'', redirectTo:'home', pathMatch:'full'},
  { path:'home', component: MainPageComponent, resolve: {categories: QuizCategoryResolverService}},
  { path:'quiz', component: QuizComponent, canDeactivate:[QuizCanDeactivateGuardService], resolve: {quiz: QuizQuestionsResolverService}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
