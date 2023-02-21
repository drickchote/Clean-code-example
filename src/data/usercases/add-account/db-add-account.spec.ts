import { DbAddAccount } from "./db-add-account";

const makeEcrypterStub = () => {
  class EncrypterStub {
    async encrypt(text: string): Promise<string> {
      return new Promise((resolve) => resolve("encrypted_password"));
    }
  }
  return new EncrypterStub();
};

const makeSut = () => {
  const encrypterStub = makeEcrypterStub();
  const sut = new DbAddAccount(encrypterStub);

  return {
    sut,
    encrypterStub,
  };
};

describe("DbAddAccount Usecase", () => {
  test("Should call Encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
  });

  test("Should throw if Encrypter throws", async () => {
    const { sut, encrypterStub } = makeSut();

    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };

    const accountPromise = sut.add(accountData);
    await expect(accountPromise).rejects.toThrow();
  });
});
