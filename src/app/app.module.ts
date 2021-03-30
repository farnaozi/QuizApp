import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizService } from './shared/services/quiz.service';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DecodeHtmlEntitiesModule } from 'decode-html-entities';
import { QuizCanDeactivateGuardService } from './shared/services/quiz-can-deactivate-guard.service';
import { FooterComponent } from './pages/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    QuizComponent,
    NavigationComponent,
    FooterComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [QuizService,
    QuizCanDeactivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
