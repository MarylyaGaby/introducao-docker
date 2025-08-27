import { ApiProperty ,PartialType } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class CreateUserDto {

    @ApiProperty({
        example:'Marilia Gabriele',
        description:'Nome completo do usuário'
    })
    @IsNotEmpty({ message:'O nome é obrigatório!' })
    name: string

    @ApiProperty({
        example:'mariliagabriele@gmail.com',
        description:'Email do usuário'
    })
    @IsEmail({}, { message:"O email deve ser um endereço válido" })
    email: string

    @ApiProperty({
        example:'123456',
        description:'Senha do usuário'
    })
    @IsNotEmpty({ message:'A senha é obrigatória!' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}