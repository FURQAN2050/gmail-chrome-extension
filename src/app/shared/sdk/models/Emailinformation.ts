/* tslint:disable */

declare var Object: any;
export interface EmailinformationInterface {
  "projectManager"?: string;
  "htmlTemplate"?: string;
  "htmlRecipient"?: string;
  "id"?: number;
  "enduserId"?: number;
}

export class Emailinformation implements EmailinformationInterface {
  "projectManager": string;
  "htmlTemplate": string;
  "htmlRecipient": string;
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
        "projectManager": {
          name: 'projectManager',
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
