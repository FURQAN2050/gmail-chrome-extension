import { Injectable } from '@angular/core';
import {
  EmailApi,
  GroupApi,
  GroupemailApi,
  TemplateApi,
} from '../../shared/sdk';
@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(
    public EmailApi: EmailApi,
    private GroupApi: GroupApi,
    private GroupemailApi: GroupemailApi,
    private TemplateApi: TemplateApi
  ) {}

  async lookupGroups(filters: any) {
    this.GroupApi.getEmails(1)
      .toPromise()
      .then((res) => {
        console.log(res);
      });
    return this.GroupApi.find(filters).toPromise();
  }

  async lookupTemplates(filters: any) {
    return this.TemplateApi.find(filters).toPromise();
  }

  async upsertGroupEmailAPI(payload: any) {
    if (!(payload instanceof Array)) {
      payload = [payload];
    }
    for (let i = 0; i < payload.length; i++) {
      let groupEmail = payload[i];
      await this.GroupemailApi.create(groupEmail).toPromise();
    }
  }

  async upsertGroup(payload: any) {
    if (!payload.id) {
      return await this.GroupApi.create(payload).toPromise();
    } else {
      return await this.GroupApi.updateAttributes(
        payload.id,
        payload
      ).toPromise();
    }
  }

  async deleteGroupEmail(emailId, groupId) {
    console.log(emailId);
    console.log(groupId);
    return await this.GroupemailApi.find({
      where: { and: [{ emailId: emailId, groupId: groupId }] },
    })
      .toPromise()
      .then((res: any) => {
        console.log(res);
        if (res.length) {
          console.log(res[0]);
          this.GroupemailApi.deleteById(res[0].id).toPromise();
        }
      });
  }

  async upsertEmail(payload: any) {
    const { id } = payload;
    if (!id) return await this.EmailApi.create(payload).toPromise();
    else return await this.EmailApi.updateAttributes(id, payload).toPromise();
  }

  async upsertTemplate(payload: any) {
    if (!payload.id) {
      return await this.TemplateApi.create(payload).toPromise();
    } else {
      return await this.TemplateApi.updateAttributes(
        payload.id,
        payload
      ).toPromise();
    }
  }
}
