import {GeneralDomain} from "../../../models/generalDomain";
import {User} from "../../../models/user/user";

export namespace Answer {
  export class Action extends GeneralDomain{
    body: string;
    videoLink: string;
    creatorDisplayName: string;
    isBestAnswer = false;
    usefulCount = 0;
    activeClass = false;
    authorCheck:boolean = false;
    uploadedPresentation:string;
  }

  export enum AnswerStatus {
    WAITING = 'WAITING' as any,
    FAILED = 'FAILED' as any,
    CONFIRMED = 'CONFIRMED' as any,
  }
}
