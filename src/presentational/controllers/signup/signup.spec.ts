import { InvalidParamError } from "../../errors/invalid-params-error";
import { MissingParamError } from "../../errors/missing-params-error";
import { EmailValidator } from "../../protocols/email-validator";
import { SignUpController } from "./signup";

interface MakeSutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): MakeSutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  const emailValidatorStub = new EmailValidatorStub();

  return {
    sut: new SignUpController(emailValidatorStub),
    emailValidatorStub: emailValidatorStub,
  };
};

describe("SignUpController", () => {
  test("should return 400 if no name is provided ", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handler(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("should return 400 if no email is provided ", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handler(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });

  test("should return 400 if no password is provided ", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: "any_email@email.com",
        name: "any_name",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handler(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("password"));
  });

  test("should return 400 if no password confirmation is provided ", () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: "any_email@email.com",
        name: "any_name",
        password: "any_password",
      },
    };

    const httpResponse = sut.handler(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError("passwordConfirmation")
    );
  });

  test("should return 400 if an invalid email is provided", () => {
    const { sut, emailValidatorStub } = makeSut();

    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        email: "invalid_email@email.com",
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handler(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  test("should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();

    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const httpRequest = {
      body: {
        email: "any_email@email.com",
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    sut.handler(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("any_email@email.com");
  });
});
