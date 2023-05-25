import { IsEmail, MinLength, NotContains } from "class-validator";

export class RegUserDTO {
  /**
   * users email -unique
   */
  @IsEmail()
  readonly userEmail: string;
  /**
   * usres password
   */
  @MinLength(4)
  @NotContains(' ')
  readonly userPassword: string;
}
