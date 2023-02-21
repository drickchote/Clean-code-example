import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(user: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(user.password);
    return new Promise((resolve) => resolve(null));
  }
}
