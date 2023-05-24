import { TokensDTO } from './tokens.dto';
import { UserDTO } from './user.dto';

export class APIUserDTO extends TokensDTO {
  user: UserDTO;
}
