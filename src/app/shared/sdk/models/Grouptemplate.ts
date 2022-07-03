/* tslint:disable */
import {
  Template,
  Group
} from '../index';

declare var Object: any;
export interface GrouptemplateInterface {
  "date"?: Date;
  "id"?: number;
  "templateId"?: number;
  "groupId"?: number;
  template?: Template;
  group?: Group;
}

export class Grouptemplate implements GrouptemplateInterface {
  "date": Date;
  "id": number;
  "templateId": number;
  "groupId": number;
  template: Template;
  group: Group;
  constructor(data?: GrouptemplateInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Grouptemplate`.
   */
  public static getModelName() {
    return "Grouptemplate";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Grouptemplate for dynamic purposes.
  **/
  public static factory(data: GrouptemplateInterface): Grouptemplate{
    return new Grouptemplate(data);
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
      name: 'Grouptemplate',
      plural: 'Grouptemplates',
      path: 'Grouptemplates',
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
        "templateId": {
          name: 'templateId',
          type: 'number'
        },
        "groupId": {
          name: 'groupId',
          type: 'number'
        },
      },
      relations: {
        template: {
          name: 'template',
          type: 'Template',
          model: 'Template',
          relationType: 'belongsTo',
                  keyFrom: 'templateId',
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
