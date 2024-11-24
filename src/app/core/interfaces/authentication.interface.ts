export interface Authentication {
  name: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
}

export interface AccessToken {
  access_token: string;
}
