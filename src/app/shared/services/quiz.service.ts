import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  _serviceUrl: string = 'https://opentdb.com';

  constructor(private _httpClient: HttpClient) { }

  GetQuizCategories(){
    return this._httpClient.get(`${this._serviceUrl}/api_category.php`)
  }

  GetQuizQuestions(amount: string,category: string, difficulty: string){
    
    let params = new HttpParams()
    .set('amount', amount)
    .set('difficulty', difficulty)
    .set('category', category);

    return this._httpClient.get(`${this._serviceUrl}/api.php`,  {params: params})
  }

}
