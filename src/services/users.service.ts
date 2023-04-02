import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/database/prisma.service';
import { userDTO } from 'src/dto/user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany();
    return {
      data: users,
    };
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async createUser(body: userDTO) {
    const { name, email, password } = body;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    try {
      const user = await this.prisma.user.create({
        data: {
          id: randomUUID(),
          name,
          email,
          password: hash,
        },
      });
      return {
        data: user,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  async editUser(body: userDTO) {
    const { id, name, email, password, role, cpf } = body;
    const updateAt = new Date(Date.now());
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name,
          email,
          password,
          cpf,
          role,
          updateAt,
        },
      });
      return user;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return {
        data: user,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
