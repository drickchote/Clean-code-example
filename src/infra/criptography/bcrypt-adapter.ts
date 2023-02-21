import { Encrypter } from "../../data/protocols/encrypter";
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number

  constructor(salt: number){
    this.salt = salt
  }

  async encrypt(text: string): Promise<string> {
    const hash = await bcrypt.hash(text, this.salt)
    return hash
  }
}