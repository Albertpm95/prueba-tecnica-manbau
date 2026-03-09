import { UserDTO } from "../dtos/user.dto";
import { User } from "../models/user";


export function UserDTOtoModel(dto: UserDTO): User {
    return {
      id: dto.id,
      fullName: dto.full_name,
      userRole: dto.user_role,
      userName: dto.username
    };
  
}