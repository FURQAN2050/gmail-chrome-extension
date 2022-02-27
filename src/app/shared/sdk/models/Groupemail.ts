/* tslint:disable */
import {
  Email,
  Group
} from '../index';

declare var Object: any;
export interface GroupemailInterface {
  "date"?: Date;
  "id"?: number;
  "emailId"?: number;
  "groupId"?: number;
  email?: Email;
  group?: Group;
}

export class Groupemail implements GroupemailInterface {
  "date": Date;
  "id": number;
  "emailId": number;
  "groupId": number;
  email: Email;
  group: Group;
  constructor(data?: GroupemailInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Groupemail`.
   */
  public static getModelName() {
    return "Groupemail";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Groupemail for dynamic purposes.
  **/
  public static factory(data: GroupemailInterface): Groupemail{
    return new Groupemail(data);
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
      name: 'Groupemail',
      plural: 'Groupemails',
      path: 'Groupemails',
      idName: 'id',
      properties: {
        "date": {
          name: 'date',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "emailId": {
          name: 'emailId',
          type: 'number'
        },
        "groupId": {
          name: 'groupId',
          type: 'number'
        },
      },
      relations: {
        email: {
          name: 'email',
          type: 'Email',
          model: 'Email',
          relationType: 'belongsTo',
                  keyFrom: 'emailId',
          keyTo: 'id'
        },
        group: {
          name: 'group',
          type: 'Group',
          model: 'Group',
          relationType: 'belongsTo',
                  keyFrom: 'groupId',
          keyTo: 'id'
        },
      }
    }
  }
}
