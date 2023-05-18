export interface Login{
    email: string,
    password: string
}

export interface UserRegister{
  personName: string
  gender: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

export interface ReturnResponse {
    personName: string
    email: string
    token: string
    expiration: string
  }

