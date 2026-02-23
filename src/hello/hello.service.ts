import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelloService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
const appName = this.configService.get<string>('appName');
    console.log(appName);
    
    return 'Hello NestJS!';
  }

  getHelloWithName(name: string): string {
    return `Hello ${name} from NestJS!`;
  }
}
