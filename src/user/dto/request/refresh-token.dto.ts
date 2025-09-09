import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3NTcyNDU5MDksImV4cCI6MTc1NzI0NTk2OX0.d1bySWPtFyOQl4wCD7kTazLhuTLxmC_eHw__b0PsrEw',
  })
  @IsString()
  refreshToken: string;
}
