import { Injectable } from '@angular/core';
import {GroupApi,GroupemailApi} from '../../shared/sdk';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private GroupApi:GroupApi,private GroupemailApi: GroupemailApi ) { }

  async lookupGroups(filters:any){
    return this.GroupApi.find(filters).toPromise();
  }

  async upsertGroupEmailAPI(payload:any){
    if(!(payload instanceof Array)){
     payload=[payload]; 
    }
    for(let i=0;i<payload.length;i++){
      let groupEmail=payload[i];
      await this.GroupemailApi.create(groupEmail).toPromise();
    }
  }

  async upsertGroup(payload:any){
    if(payload.id){
      await this.GroupApi.create(payload).toPromise();
    }else{
      await this.GroupApi.updateAttributes(payload.id,payload).toPromise();
    }
  }


  async deleteGroupEmail(id:any){
    await this.GroupemailApi.deleteById(id).toPromise(); 
  }

}
