export interface Token {
    generateToken(payload: object, secret: any, options: object): string
}
export interface Encryptor {
    encrypt(password: string): string
    compare(passwordDB: string, passwordLogin: string): boolean
}