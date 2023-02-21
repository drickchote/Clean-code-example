import { AddAccountRepository } from "../../protocols/add-account-repository";
import { DbAddAccount } from "./db-add-account";
import { AccountModel, AddAccountModel } from "./db-add-account-protocols";

const makeEcrypterStub = () => {
  class EncrypterStub {
    async encrypt(text: string): Promise<string> {
      return new Promise((resolve) => resolve("encrypted_password"));
    }
  }
  return new EncrypterStub();
};

const makeAddAccountRepositoryStub = () => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(user: AddAccountModel): Promise<AccountModel> {
      return new Promise((resolve) =>
        resolve({
          id: "valid_id",
          name: "valid_name",
          email: "valid_email",
          password: "encrypted_password",
        })
      );
    }
  }

  return new AddAccountRepositoryStub();
};

const makeSut = () => {
  const encrypterStub = makeEcrypterStub();
  const addAccountRepositoryStub = makeAddAccountRepositoryStub();
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub);

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
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

  test("Should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "encrypted_password",
    });
  });

  test("Should throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();

    jest
      .spyOn(addAccountRepositoryStub, "add")
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
