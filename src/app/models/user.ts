export interface User {
  readonly id: number;
  username: string;
  nickname: string;
  enabled: boolean;
  roleName: string;
  email: string;
  userface: string;
  regTime: Date;
}
