export class SignUpController {
  handler(httpRequest: any): any {
    if (!httpRequest.name) {
      return {
        body: new Error("Name param is missing"),
        statusCode: 400,
      };
    }

    if (!httpRequest.email) {
      return {
        body: new Error("Email param is missing"),
        statusCode: 400,
      };
    }
  }
}
