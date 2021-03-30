import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Injectable({
  providedIn: 'root'
})
export class QuizCategoryResolverService implements Resolve<any>  {

  constructor(private _service: QuizService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._service.GetQuizCategories();
  }

}
