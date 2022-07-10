import { GeneralDomain } from '../../../models/generalDomain';


export namespace ReportIssue {
    export class Action extends GeneralDomain {
        issue:string;
        paperId:string;
        videoId:string;
        title:string;
        tagList: Tag[] = [];

        questionStatus:String; 
         date :string ;
         seen = 0;
         usefulCount =0;
         creatorDisplayName :string;
    }

    export class Tag extends GeneralDomain {
        title: string;
      }
}