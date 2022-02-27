/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Email } from '../../models/Email';
import { Template } from '../../models/Template';
import { Enduser } from '../../models/Enduser';
import { Group } from '../../models/Group';
import { Groupemail } from '../../models/Groupemail';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Email: Email,
    Template: Template,
    Enduser: Enduser,
    Group: Group,
    Groupemail: Groupemail,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
