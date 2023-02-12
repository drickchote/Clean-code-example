import { MissingParamError } from "../../errors/missing-params-error";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class SignUpController {
  handler(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        body: new MissingParamError("name"),
        statusCode: 400,
      };
    }

    if (!httpRequest.body.email) {
      return {
        body: new MissingParamError("email"),
        statusCode: 400,
      };
    }
  }
}
