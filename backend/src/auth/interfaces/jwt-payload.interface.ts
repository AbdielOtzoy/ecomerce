export interface JwtPayload {
  sub: number;
  username: string;
  email: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
}
