import { ApiProperty } from '@nestjs/swagger';

export class OnboardingItemDto {
  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty()
  itemHeader: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  enabledForOrgs: boolean;

  @ApiProperty()
  confirmationEndpoint: string;

  @ApiProperty()
  mobileRedirectUrl: string;

  @ApiProperty()
  webRedirectUrl: string;

  @ApiProperty()
  order: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  userType: string;

  @ApiProperty({ required: false })
  active?: boolean;

  @ApiProperty({ required: false })
  deleted?: boolean;

  @ApiProperty({ required: false })
  dateCreated?: Date;

  @ApiProperty({ required: false })
  lastModified?: Date;
}
