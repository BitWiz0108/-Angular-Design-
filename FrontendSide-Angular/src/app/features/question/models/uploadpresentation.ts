import { GeneralDomain } from '../../../models/generalDomain';

export namespace UploadPresentation {
  export class Action {
    title: string;
    name: string;
    yearOfPaper: string;
    firstAuthorName: string;
    body: string;
    uploadAPresentation: string;
    presentationLink: string;
    authorCheck: string;
    creatorDisplayName: string;
    tagList: Tag[] = [];
    questionStatus: QuestionStatus;
  }

  export class Tag extends GeneralDomain {
    title: string;
  }

  export enum QuestionStatus {
    NOPRESENTATIONYET = 'NOPRESENTATIONYET',
    WITHPRESENTATION = 'WITHPRESENTATION',
    CLOSED = 'CLOSED',
  }
}
