/* tslint:disable */
import {
  Email,
  Template
} from '../index';

declare var Object: any;
export interface GroupInterface {
  "name"?: string;
  "id"?: number;
  "enduserId"?: number;
  emails?: Email[];
  templates?: Template[];
}

export class Group implements GroupInterface {
  "name": string;
  "id": number;
  "enduserId": number;
  emails: Email[];
  templates: Template[];
  constructor(data?: GroupInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Group`.
   */
  public static getModelName() {
    return "Group";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Group for dynamic purposes.
  **/
  public static factory(data: GroupInterface): Group{
    return new Group(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Group',
      plural: 'Groups',
      path: 'Groups',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "enduserId": {
          name: 'enduserId',
          type: 'number'
        },
      },
      relations: {
        emails: {
          name: 'emails',
          type: 'Email[]',
          model: 'Email',
          relationType: 'hasMany',
          modelThrough: 'Groupemail',
          keyThrough: 'emailId',
          keyFrom: 'id',
          keyTo: 'groupId'
        },
        templates: {
          name: 'templates',
          type: 'Template[]',
          model: 'Template',
          relationType: 'hasMany',
          modelThrough: 'Grouptemplate',
          keyThrough: 'templateId',
          keyFrom: 'id',
          keyTo: 'groupId'
        },
      }
    }
  }
}
