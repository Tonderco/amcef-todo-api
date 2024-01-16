import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddOwnerDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
