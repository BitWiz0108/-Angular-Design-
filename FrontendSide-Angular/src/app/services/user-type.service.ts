import {Injectable} from '@angular/core';
import {MessageAgent} from "./message-agent";

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor(private messageAgent: MessageAgent) {
  }

  getAll(page?: number, size?: number) {
    return this.messageAgent.executeMessage({title:"getAllUserType",
      parameter:{
        "page": page,
        "size": size,
      }
    });
  }

  getAllMethod() {
    return this.messageAgent.executeMessage({title:"getAllMethod"});
  }

  create(userType) {
    return this.messageAgent.executeMessage({title:"createUserType",parameter:userType})
  }

  update(userType) {
    return this.messageAgent.executeMessage({title:"updateUserType",parameter:{
        data: userType,
        query: {_id: userType._id}
      }});
  }

  delete(id) {
    return this.messageAgent.executeMessage({title:"deleteUserType",parameter:{
        query: {_id: id}
      }});
  }

  getOne(id) {
    return this.messageAgent.executeMessage({title: 'getOneUserType', parameter: {
        "query":{'_id': id},
      }
    });
  }

  changeDefaultCustomer(id: string) {
    return this.messageAgent.executeMessage( { title: 'changeDefaultCustomer', parameter: {
      'query': {_id: id}
      }})
  }
}
