import { UserDTO } from '../dtos/user.dto';
import { User } from '../models/user';

export function UserDTOtoModel(dto: UserDTO): User {
  // En un caso real estaria separado el DTO/Modelo de usuarios (para usuarios asignados) con el propio usuario
  return {
    id: dto.id,
    fullName: dto.full_name,
    userRole: dto.user_role,
    userName: dto.username,
  };
}
