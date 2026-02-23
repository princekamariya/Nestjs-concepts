import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';

@Module({
  imports: [], // import other modules if needed
  controllers: [HelloController],
  providers: [HelloService],
  exports: [HelloService], // export services if needed
})
export class HelloModule {}
