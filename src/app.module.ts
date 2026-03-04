import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import appConfig from './config/app.config';

@Module({
  imports: [HelloModule, UserModule, ConfigModule.forRoot(
    {isGlobal: true, load: [appConfig]}
  ), PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
