/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
export class SignInAuthDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
