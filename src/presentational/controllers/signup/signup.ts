import { HttpRequest, HttpResponse } from "../../protocols/http";

export class SignUpController {
  handler(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        body: new Error("Name param is missing"),
        statusCode: 400,
      };
    }

    if (!httpRequest.body.email) {
      return {
        body: new Error("Email param is missing"),
        statusCode: 400,
      };
    }
  }
}
