import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { QuizComponent } from "src/app/pages/quiz/quiz.component";

@Injectable()
export class QuizCanDeactivateGuardService implements CanDeactivate<QuizComponent>{
    canDeactivate(component: QuizComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean  {
         if(component._questionNumber == 0 
            || component._quetsions.length == 0)
            return true;
        return confirm('Are you sure you want to end this quiz?')
    }

}