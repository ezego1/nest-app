import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class TrackerDTO {
  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Item completed field should not be empty' })
  @IsBoolean()
  itemCompleted: boolean;

  @ApiProperty({ required: false })
  dateCompleted?: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Company field should not be empty' })
  @IsString()
  company: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'User field should not be empty' })
  @IsString()
  user: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Onboarding Item field should not be empty' })
  @IsString()
  @Length(3, 255)
  onboardingItem: string;

  @ApiProperty({ required: false })
  active?: boolean;

  @ApiProperty({ required: false })
  deleted?: boolean;

  @ApiProperty({ required: false })
  dateCreated?: Date;

  @ApiProperty({ required: false })
  lastModified?: Date;
}
