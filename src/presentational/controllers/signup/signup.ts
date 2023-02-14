import { MissingParamError } from "../../errors/missing-params-error";
import { badRequest } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class SignUpController implements Controller {
  handler(httpRequest: HttpRequest): HttpResponse {
    const requiredParams = [
      "name",
      "email",
      "password",
      "passwordConfirmation",
    ];

    for (const field of requiredParams) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
