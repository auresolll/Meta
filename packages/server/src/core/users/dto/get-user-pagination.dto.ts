// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiProperty } from '@nestjs/swagger';

export class GetUsersPaginationDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
