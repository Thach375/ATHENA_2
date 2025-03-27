import { PricingPlan } from '@constants/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateCreditDto {
  @ApiProperty({
    name: 'credits',
    description: "user's credits",
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  credits: number;

  @ApiProperty({
    name: 'pricingPlan',
    description: "user's pricing plan",
    required: false,
  })
  @IsEnum(PricingPlan)
  pricingPlan: PricingPlan;
}
