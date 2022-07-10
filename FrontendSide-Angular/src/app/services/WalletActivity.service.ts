import {Injectable} from '@angular/core';
import {MessageAgent} from "./message-agent";
import {WalletActivity} from "../models/other/walletActivity";
import {Role} from "../models/enums/role";
import {Config} from "../config/config";

@Injectable({
  providedIn: 'root'
})
export class WalletActivityService {

  constructor(private messageAgent: MessageAgent) {
  }

  getAllWalletActivities() {
    return this.messageAgent.executeMessage({title:"getAllWalletActivities",parameter:{
        populate: { path: 'user', select: 'firstName lastName'}
      }});
  }

  update(walletActivity: WalletActivity.Action) {
    return this.messageAgent.executeMessage({title:"updateWalletActivity",parameter:{
        data: walletActivity,
        query: {_id: walletActivity._id}
      }});
  }

  delete(id) {
    return this.messageAgent.executeMessage({title:"deleteWalletActivity",parameter:{
        query: {_id: id}
      }});
  }

  getOne(id) {
    return this.messageAgent.executeMessage({title:"getOneWalletActivity",parameter: {
        "query":{'_id': id}}
    });
  }

  getAllWalletActivityByFilterAndPagination(page, size) {
    let title = 'getAllWalletActivityCustomer';
    if (Config.getLocalStorageUserPrivilege().findIndex( item => item === 'getAllWalletActivity') !== -1 ||
      Config.getLocalStorageUser().userType.role === Role.ADMIN) {
      title = 'getAllWalletActivity';
    }
    return this.messageAgent.executeMessage({title:title,
      parameter:{
        // "query": searchCustomer,
        "page": page,
        "size": size,
        populate: { path: 'user', select: 'firstName lastName'}
        // "populate": [{ "path": "categoryId", "select": "title"},{ "path": "contents", "select": "title"}]
      }
    });
  }

}
