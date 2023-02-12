import { SignUpController } from "./signup";

describe("SignUpController", () => {
  test("should return 400 if no name is provided ", () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: "any_email@email.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handler(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Name param is missing"));
  });

  test("should return 400 if no email is provided ", () => {
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };

    const httpResponse = sut.handler(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Email param is missing"));
  });
});
