import {Injectable} from '@angular/core';
import {MessageAgent} from "./message-agent";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private messageAgent: MessageAgent) {}

  create(content) {
    return this.messageAgent.executeMessage({title:"createContent",parameter:content})
  }

  update(content) {
    return this.messageAgent.executeMessage({title:"updateContent",parameter:{
        data: content,
        query: {_id: content._id}
      }});
  }

  delete(id: string, reference) {
    return this.messageAgent.executeMessage({title:"deleteContent",parameter:{
        query: {_id: id},
        references: reference
      }});
  }

}
