export interface ResultValidateObject {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: number;
  birthday: Date;
  gender: boolean;
  avatar: string;
  banner: string;
  fcm_tokens: string[];
}

export interface ResultPayloadJWTObject {
  sub: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: number;
  birthday: Date;
  gender: boolean;
  avatar: string;
  banner: string;
}
