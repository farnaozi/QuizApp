import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IQuestionModel } from 'src/app/shared/models/iquestion_model';
import { QuizService } from 'src/app/shared/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  _quetsions: IQuestionModel[] = [];
  _answers: boolean[] = [];
  _questionNumber: number = 1;
  _answer: string | undefined;
  _response_code: number | undefined;
  @HostListener('window:beforeunload',['$event'])

  showMessage($event: { returnValue: string; }) {
    if(this._questionNumber != 0)
     $event.returnValue='Your data will be lost!';
  }
  
  constructor(private _route: ActivatedRoute,
    private _quizService: QuizService,
    private _router: Router) { 
    }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params =>{
      if(!params['amount'] 
      || !params['category']
      || !params['difficulty']){
        this._router.navigate(['']);
        return;
      }
      else
        this._route.data.subscribe(res => {
          this._response_code = res.quiz.response_code;
          this._answers = [res.quiz.results.length];
          this.LoadData(res.quiz.results);
        });
    })
  }

  next() {
    if (this._answer
      == this._quetsions[this._questionNumber - 1].correct_answer)
      this._answers[this._questionNumber - 1] = true;
    else
      this._answers[this._questionNumber - 1] = false;
    this._answer = undefined;

    if(this._quetsions.length != this._questionNumber)
      this._questionNumber += 1;
    else
      this._questionNumber = 0;
  }

  TryAgain(){
    this._route.queryParams.subscribe(params=>{
      this._quizService.GetQuizQuestions(
        params['amount'],
        params['category'],
        params['difficulty']
      ).subscribe((data:any) => {
        this.LoadData(data.results);
      })
    })

  }

  LoadData(data:any[]){
    this._answers = []
    this._quetsions = []
    this._questionNumber = 1;
    if(this._response_code == 1)
      this._questionNumber = 0;
    data.forEach((element: any) => {
      let txt = document.createElement("textarea");
      txt.innerHTML = element.question;
      let tempQuestion: IQuestionModel = {
        type: element.type,
        question: txt.value,
        answers: [],
        correct_answer: element.correct_answer
      }
      if (element.type == "multiple") {
        txt.innerHTML = element.correct_answer;
        tempQuestion.answers.push(txt.value);
        for (let e of element.incorrect_answers){
          txt.innerHTML = e;
          tempQuestion.answers.push(txt.value);
        }
        tempQuestion.answers = [...this.shuffle(tempQuestion.answers)];
      }
      else {
        tempQuestion.answers.push('True')
        tempQuestion.answers.push('False')
      }
      this._quetsions.push({ ...tempQuestion });
    });
  }

  GetCorrectAnswersCount(){
    return this._answers.filter(answer => answer == true).length;
  }

  shuffle(array: string[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

}
