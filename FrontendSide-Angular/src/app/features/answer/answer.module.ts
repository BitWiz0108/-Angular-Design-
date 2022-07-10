import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerActionComponent } from './components/answer-action/answer-action.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [AnswerActionComponent],
    exports: [
        AnswerActionComponent
    ],
    imports: [
        CommonModule,
        AnswerRoutingModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AnswerModule { }
