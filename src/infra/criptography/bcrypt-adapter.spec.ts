import bcrypt from 'bcrypt'
import { BcryptAdapter } from "./bcrypt-adapter";


jest.mock('bcrypt', () => ({
  async hash(): Promise<string>{
    return new Promise(resolve => resolve("hashed_value"))
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  const salt = 12
  return new BcryptAdapter(salt)
}

describe('BryptAdapter', () => {
  test('should call bcrypt with correct values', async() => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, "hash")
    await sut.encrypt("any_value")
    expect(hashSpy).toHaveBeenCalledWith("any_value", salt) 
  });

  test('should return bcrypt hash on success', async() => {
    const sut = makeSut()
    const hashedValue = await sut.encrypt("any_value")

    expect(hashedValue).toBe("hashed_value") 
  });

  test('should throws if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {throw new Error()})
    const hashPromise =  sut.encrypt("any_value")
    await expect(hashPromise).rejects.toThrow()
  })
})