import { Injectable, NotFoundException } from '@nestjs/common';
import { HelloService } from 'src/hello/hello.service';

@Injectable()
export class UserService {
  // Injecting Service from other module
  // HelloModule must export HelloService
  // UserModule must import HelloModule
  constructor(private readonly helloService: HelloService) {}

  getAllUsers(): { id: number; name: string }[] {
    return [
      {
        id: 1,
        name: 'John Doe',
      },
      {
        id: 2,
        name: 'Jane Doe',
      },
      {
        id: 3,
        name: 'Jim Beam',
      },
    ];
  }

  getUserById(id: number) {
    return this.getAllUsers().find((user) => user.id === id);
  }

  getWelcomeMessage(userId: number): string {
    const user = this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return `Welcome to the user service! ${this.helloService.getHelloWithName(user.name)}`;
  }
}
