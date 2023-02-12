export class SignUpController {
  handler(httpRequest: any): any {
    return {
      body: new Error("Name param is missing"),
      statusCode: 400,
    };
  }
}
