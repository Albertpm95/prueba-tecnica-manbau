import { UserDTO } from '../../shared/dtos/user-dto';
import { User } from '../../shared/models/user';

export class UserMapper {
  public static toModel(dto: UserDTO): User {
    return {
      id: dto.id,
      fullName: dto.full_name,
      userRole: dto.user_role,
      userName: dto.username
    };
  }
}