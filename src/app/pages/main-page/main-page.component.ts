import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategoryModel } from 'src/app/shared/models/icategory_model';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  _categories: ICategoryModel[] = [];
  _quizForm: {
    amount: number,
    category: number | null,
    difficulty: string | null
  } = {
      amount: 10,
      category: null,
      difficulty: null
    }
  constructor(private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this._route.data.subscribe(res => {
      this._categories = res.categories.trivia_categories;
    });
  }

  CheckValidity() {
    if (this._quizForm.amount < 0) {
      this._quizForm.amount = 1;
    }
    else if(this._quizForm.amount > 50)
      this._quizForm.amount = 50;
  }

  StartTheQuiz() {
    this._router.navigate(['quiz'], {
      queryParams: {
        'amount': this._quizForm.amount.toString(),
        'category': this._quizForm.category?.toString(),
        'difficulty': this._quizForm.difficulty
      }
    })
  }

}
