/* tslint:disable */

declare var Object: any;
export interface TemplateInterface {
  "template"?: string;
  "name"?: string;
  "id"?: number;
  "enduserId"?: number;
}

export class Template implements TemplateInterface {
  "template": string;
  "name": string;
  "id": number;
  "enduserId": number;
  constructor(data?: TemplateInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Template`.
   */
  public static getModelName() {
    return "Template";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Template for dynamic purposes.
  **/
  public static factory(data: TemplateInterface): Template{
    return new Template(data);
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
      name: 'Template',
      plural: 'Templates',
      path: 'Templates',
      idName: 'id',
      properties: {
        "template": {
          name: 'template',
          type: 'string'
        },
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
      }
    }
  }
}
