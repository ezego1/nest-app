/**
 * @param {Number} code - status code of the response
 * @param {string} description - description identify the code
 * @param {{}} payload - response object
 * @param {Token} token - jwt token
 * @returns {{}}
 */

export interface ICustomResponse {
  code: number;
  description: string;
  data: any;
}

export function customResponse(
  code: number,
  description: string,
  data: { [key: string]: any }[] | { [key: string]: any } | null = undefined,
): ICustomResponse {
  return {
    code,
    description,
    data,
  };
}

// { code:0, description: "Success", data:[ {label: "device type name", value:"device type pk"} ] }
