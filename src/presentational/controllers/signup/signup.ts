import { MissingParamError } from "../../errors/missing-params-error";
import { badRequest } from "../../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class SignUpController {
  handler(httpRequest: HttpRequest): HttpResponse {
    const requiredParams = ["name", "email", "password"];

    for (const field of requiredParams) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
