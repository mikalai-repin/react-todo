export type AuthResponse = {
  access_token: string
}

export type LoginData = {
  email: string
  password: string
}

export type SignUpData = LoginData & {
  name: string
}
