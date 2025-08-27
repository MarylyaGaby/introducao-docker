import { IsEmail, IsString } from 'class-validator'

export class LoginDto {
    @IsEmail({}, {message:'O email precisa ser válidado'})
    email: string;

    @IsString({message:"A senha precisa ser textual."})
    password: string;
}