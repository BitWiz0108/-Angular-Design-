import {Injectable} from '@angular/core';
import {MessageAgent} from "./message-agent";

@Injectable({
  providedIn: 'root'
})
export class ChunkService {

  constructor(private messageAgent: MessageAgent) {
  }

  create(formData: FormData) {
    return this.messageAgent.executeMessageForMultiPart(formData);
  }

}
