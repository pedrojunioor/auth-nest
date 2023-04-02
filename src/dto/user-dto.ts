import { IsNotEmpty } from 'class-validator'

export class userDTO {
  id: string
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  email: string
  @IsNotEmpty()
  password: string
  role: string
  cpf: string
  createdAt: Date
  updateAt: Date

}
export class userUpdateDTO {

  @IsNotEmpty()
  id: string
  name: string
  email: string
  password: string
  role: string
  cpf: string
  createdAt: Date
  updateAt: Date

}