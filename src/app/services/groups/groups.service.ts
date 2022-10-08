import { Injectable } from '@angular/core';
import {
  EmailApi,
  EmailinformationApi,
  GroupApi,
  GroupemailApi,
  GrouptemplateApi,
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
    private TemplateApi: TemplateApi,
    private GroupTemplateApi: GrouptemplateApi,
    private EmailInfoApi: EmailinformationApi
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
  async upsertGroupTemplateAPI(payload: any) {
    if (!(payload instanceof Array)) {
      payload = [payload];
    }
    for (let i = 0; i < payload.length; i++) {
      let groupTemplate = payload[i];
      await this.GroupTemplateApi.create(groupTemplate).toPromise();
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
  async getGroupEmailId(emailId, groupId) {
    return await this.GroupemailApi.find({
      where: { and: [{ emailId: emailId, groupId: groupId }] },
    }).toPromise();
  }

  async deleteGroupEmail(id) {
    return await this.GroupemailApi.deleteById(id).toPromise();
  }

  async deleteGroupTemplate(id) {
    return await this.GroupTemplateApi.deleteById(id).toPromise();
  }

  async getGroupTemplateId(templateId, groupId) {
    return await this.GroupTemplateApi.find({
      where: { and: [{ templateId: templateId, groupId: groupId }] },
    }).toPromise();
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

  async deleteGroup(payload) {
    const { emails, templates, id: groupId } = payload;
    // delete all the emails assciated in the bridge Table.
    if (!!emails && emails.length) {
      for (let i = 0; i < emails.length; i++) {
        const { id: emailId } = emails[i];
        let bridgeTableEmail: any = await this.getGroupEmailId(
          emailId,
          groupId
        );
        if (bridgeTableEmail.length) {
          const { id } = bridgeTableEmail[0];
          if (id) {
            console.log(id);
            await this.deleteGroupEmail(id);
          }
        }
      }
    }

    // delete all the Templates assciated in the bridge Table.
    if (!!templates && templates.length) {
      for (let i = 0; i < templates.length; i++) {
        const { id: templateId } = templates[i];
        let bridgeTableTemplate: any = await this.getGroupTemplateId(
          templateId,
          groupId
        );
        if (bridgeTableTemplate.length) {
          const { id } = bridgeTableTemplate[0];
          if (id) {
            console.log(id);
            await this.deleteGroupTemplate(id);
          }
        }
      }
    }

    // finally delete the group
    return this.GroupApi.deleteById(groupId).toPromise();
  }

  async lookupEmailInfo(filters: any) {
    return this.EmailInfoApi.find(filters).toPromise();
  }
  async parseEmailInformation(id) {
    return this.EmailInfoApi.parseEmailInformation(id).toPromise();
  }
  async deleteEmailInfo(id) {
    return await this.EmailInfoApi.deleteById(id).toPromise();
  }
}
