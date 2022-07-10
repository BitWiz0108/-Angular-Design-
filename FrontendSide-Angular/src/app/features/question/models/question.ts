import { GeneralDomain } from '../../../models/generalDomain';
import { Answer } from '../../answer/models/answer';
import { User } from '../../../models/user/user';

export namespace Question {
  export class Action extends GeneralDomain {
    title: string;
    name: string;
    year: string;
    firstAuthorName: string;
    body: string;
    tagList: Tag[] = [];
    videoPath: string;
    answerList: Answer.Action[] = [];
    commentList: Comment[] = [];
    creatorDisplayName: string;
    seen = 0;
    usefulCount = 0;
    votesCount = 0;
    answerCount = 0;
    questionStatus: QuestionStatus;
    showVideo = false; // for client
    commentToBeAdd: string = '';
  }

  export class Tag extends GeneralDomain {
    title: string;
  }

  export class Comment extends GeneralDomain {
    description: string;
    creator: User;
    questionId: string;
    userName: string;
  }

  export enum QuestionStatus {
    NOPRESENTATIONYET = 'NOPRESENTATIONYET',
    WITHPRESENTATION = 'WITHPRESENTATION',
    CLOSED = 'CLOSED' ,
  }
}
