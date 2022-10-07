/* tslint:disable */

declare var Object: any;
export interface EmailinformationInterface {
  "projectName"?: string;
  "clientName"?: string;
  "date"?: string;
  "time"?: string;
  "castingDirector"?: string;
  "startDate"?: string;
  "endDate"?: string;
  "executive"?: string;
  "role"?: string;
  "htmlTemplate"?: string;
  "htmlRecipient"?: string;
  "subject"?: string;
  "storyLine"?: string;
  "id"?: number;
  "enduserId"?: number;
}

export class Emailinformation implements EmailinformationInterface {
  "projectName": string;
  "clientName": string;
  "date": string;
  "time": string;
  "castingDirector": string;
  "startDate": string;
  "endDate": string;
  "executive": string;
  "role": string;
  "htmlTemplate": string;
  "htmlRecipient": string;
  "subject": string;
  "storyLine": string;
  "id": number;
  "enduserId": number;
  constructor(data?: EmailinformationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Emailinformation`.
   */
  public static getModelName() {
    return "Emailinformation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Emailinformation for dynamic purposes.
  **/
  public static factory(data: EmailinformationInterface): Emailinformation{
    return new Emailinformation(data);
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
      name: 'Emailinformation',
      plural: 'Emailinformations',
      path: 'Emailinformations',
      idName: 'id',
      properties: {
        "projectName": {
          name: 'projectName',
          type: 'string'
        },
        "clientName": {
          name: 'clientName',
          type: 'string'
        },
        "date": {
          name: 'date',
          type: 'string'
        },
        "time": {
          name: 'time',
          type: 'string'
        },
        "castingDirector": {
          name: 'castingDirector',
          type: 'string'
        },
        "startDate": {
          name: 'startDate',
          type: 'string'
        },
        "endDate": {
          name: 'endDate',
          type: 'string'
        },
        "executive": {
          name: 'executive',
          type: 'string'
        },
        "role": {
          name: 'role',
          type: 'string'
        },
        "htmlTemplate": {
          name: 'htmlTemplate',
          type: 'string'
        },
        "htmlRecipient": {
          name: 'htmlRecipient',
          type: 'string'
        },
        "subject": {
          name: 'subject',
          type: 'string'
        },
        "storyLine": {
          name: 'storyLine',
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
      }
    }
  }
}
