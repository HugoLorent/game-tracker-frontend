export interface Authentication {
  name: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
}

export interface UserPayload {
  sub: number;
  name: string;
  exp: number;
  iat: number;
}

export interface AccessToken {
  access_token: string;
}
