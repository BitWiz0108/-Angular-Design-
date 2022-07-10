import {EventEmitter, Injectable} from '@angular/core';
import {CodeType} from "../components/sign-up/sign-up.component";

@Injectable({
  providedIn: 'root'
})
export class CodeTypeDataService {

  codeType: EventEmitter<CodeType> = new EventEmitter();

  constructor() { }
}
