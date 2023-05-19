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

export interface AuthenticationResponse {
    personName: string
    email: string
    token: string
    expiration: string
}

export interface ReturnResponse {
    statusCode: number
    isSuccess: boolean
    response: AuthenticationResponse
    message: string
}

