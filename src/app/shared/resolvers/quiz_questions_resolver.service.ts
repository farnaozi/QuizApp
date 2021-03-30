import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, ActivatedRoute, Params } from '@angular/router';
import { IQuestionModel } from '../models/iquestion_model';
import { QuizService } from '../services/quiz.service';
import { filter, map, switchMap, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class QuizQuestionsResolverService implements Resolve<any>  {

  constructor(private _service: QuizService, private route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this._service.GetQuizQuestions(
        route.queryParams['amount'],
        route.queryParams['category'],
        route.queryParams['difficulty']);
  }

}


