import { InvalidParamError } from "../../errors/invalid-params-error";
import { MissingParamError } from "../../errors/missing-params-error";
import { badRequest } from "../../helpers/http-helper";
import { Controller } from "../../protocols/controller";
import { EmailValidator } from "../../protocols/email-validator";
import { HttpRequest, HttpResponse } from "../../protocols/http";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

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

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return badRequest(new InvalidParamError("email"));
    }
  }
}
