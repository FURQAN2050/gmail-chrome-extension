/* tslint:disable */
import {
  Group
} from '../index';

declare var Object: any;
export interface EmailInterface {
  "email"?: string;
  "nickname"?: string;
  "id"?: number;
  "enduserId"?: number;
  groups?: Group[];
}

export class Email implements EmailInterface {
  "email": string;
  "nickname": string;
  "id": number;
  "enduserId": number;
  groups: Group[];
  constructor(data?: EmailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Email`.
   */
  public static getModelName() {
    return "Email";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Email for dynamic purposes.
  **/
  public static factory(data: EmailInterface): Email{
    return new Email(data);
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
      name: 'Email',
      plural: 'Emails',
      path: 'Emails',
      idName: 'id',
      properties: {
        "email": {
          name: 'email',
          type: 'string'
        },
        "nickname": {
          name: 'nickname',
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
        groups: {
          name: 'groups',
          type: 'Group[]',
          model: 'Group',
          relationType: 'hasMany',
          modelThrough: 'Groupemail',
          keyThrough: 'groupId',
          keyFrom: 'id',
          keyTo: 'groupId'
        },
      }
    }
  }
}
