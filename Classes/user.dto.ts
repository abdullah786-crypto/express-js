import {
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
  IsDefined,
  Matches,
  ValidateIf,
} from 'class-validator';

class UserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsDefined({ message: 'Name is required' })
  @MinLength(10, { message: 'Name is too short. Its should be more then 10 characters' })
  @MaxLength(25, { message: 'Name is too long. Its should be less then 25 characters' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsDefined({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Please enter valid email address',
  })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsDefined({ message: 'Password is required' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
    message:
      'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters long',
  })
  password: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsDefined({ message: 'Address is required' })
  @MinLength(25, {
    message: 'Address is too short. It should be more than 25 characters',
  })
  @MaxLength(50, {
    message: 'Address is too long. It should be less than 50 characters',
  })
  address: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsDefined({ message: 'City is required' })
  city: string;

  @IsNotEmpty({ message: 'Phone is required' })
  @IsDefined({ message: 'Phone is required' })
  @Matches(/^\d+$/, { message: 'Phone should contain digits only' })
  phone: string;
}

export default UserDto;
