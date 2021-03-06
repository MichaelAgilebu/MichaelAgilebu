import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { count, delay, interval, Subscriber, timeout} from 'rxjs';
import { __values } from 'tslib';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  public name : string="";
  public questionList : any =[];
  public currentQuestion:number =0;
  public points: number=0;
  counter=60;
  correctAnswer=0;
  incorrectAnswer=0;
  interval$:any;
  progress:string="0";
  isQuizComplete : boolean = false;
  constructor(private questionService : QuestionService) {
    for (let sec=60; sec>0; sec--){
      setTimeout(()=>{
        this.counter = sec;
        console.log("Time:", sec);
      }, 1000); 
    }
  }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    //this.startCounter();
  }

  getAllQuestions(){
    this.questionService.getQuestionjson()
    .subscribe(res=>{
      this.questionList=res.questions;
    })
  }
  nextQuestion(){
    this.currentQuestion++;
  }
  previousQuestion(){
    this.currentQuestion--;
  }
  answer(currentQuestion:number,option:any){
    if(currentQuestion===this.questionList.length){
      this.isQuizComplete=true;
      this.stopCounter();
    }
    if(option.correct){
      this.points+=(10);
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion;
        this.resetCounter();
        this.getProgressPercent();
      },1000);
      //this.points = this.points + 10;    (this an explanation to "this.points+=(10)

    } else{
      setTimeout(() => {
      this.currentQuestion++;
      this.incorrectAnswer++
      this.getProgressPercent();
      }, 1000);
      
      this.points-=10;
    }
  }
  /*startCounter(){
    this.interval$ = interval(1000);
    subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.points-=10;
      }
    });
    setTimeout(() =>{
      this.interval$.unsubscribe()
    }, (600000));
  }*/
  async startCounter(){
    for (let sec=60; sec>0; sec--){
      await delay(1000);
      this.counter = sec;
      console.log("Time:", sec);
    }
  }
  stopCounter(){
    this.interval$.unsubscribe();
    this.counter=0;
  }
  resetCounter(){
    this.counter=60;
    this.startCounter();
  }
  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.points=0;
    this.counter=60;
    this.currentQuestion=0;
    this.progress="0";
  }
  getProgressPercent(){
    this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
    return this.progress;
  }
}

function subscribe(arg0: (val: any) => void) {
  //throw new Error('Function not implemented.');
}

