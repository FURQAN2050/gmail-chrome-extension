/* tslint:disable */
import {
  Email,
  Template,
  Group
} from '../index';

declare var Object: any;
export interface EnduserInterface {
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: number;
  "password"?: string;
  accessTokens?: any[];
  emails?: Email[];
  templates?: Template[];
  groups?: Group[];
}

export class Enduser implements EnduserInterface {
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": number;
  "password": string;
  accessTokens: any[];
  emails: Email[];
  templates: Template[];
  groups: Group[];
  constructor(data?: EnduserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Enduser`.
   */
  public static getModelName() {
    return "Enduser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Enduser for dynamic purposes.
  **/
  public static factory(data: EnduserInterface): Enduser{
    return new Enduser(data);
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
      name: 'Enduser',
      plural: 'Endusers',
      path: 'Endusers',
      idName: 'id',
      properties: {
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        emails: {
          name: 'emails',
          type: 'Email[]',
          model: 'Email',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'enduserId'
        },
        templates: {
          name: 'templates',
          type: 'Template[]',
          model: 'Template',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'enduserId'
        },
        groups: {
          name: 'groups',
          type: 'Group[]',
          model: 'Group',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'enduserId'
        },
      }
    }
  }
}
