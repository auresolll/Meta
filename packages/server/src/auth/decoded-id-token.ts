export interface DecodedIdToken {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: boolean;
  iat: number;
  exp: number;
}
