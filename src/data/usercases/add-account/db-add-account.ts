import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  Encrypter,
  AddAccountRepository,
} from "./db-add-account-protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository;

  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(user: AddAccountModel): Promise<AccountModel> {
    const encryptedPassword = await this.encrypter.encrypt(user.password);
    await this.addAccountRepository.add({
      ...user,
      password: encryptedPassword,
    });

    return new Promise((resolve) => resolve(null));
  }
}
