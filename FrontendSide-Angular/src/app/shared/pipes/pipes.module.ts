import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JalaliPipe} from './jalaliPipe';
import {PersianPipe} from './persianPipe';
import {ExerciseApprovePipe} from './exercise-approve.pipe';


@NgModule({
  declarations: [JalaliPipe, PersianPipe, ExerciseApprovePipe],
  exports: [
    JalaliPipe,
    PersianPipe,
    ExerciseApprovePipe
  ],
  imports: [
    CommonModule,
  ]
})
export class PipesModule { }
