// posts/posts.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // GET /posts?search=keyword
  @Get()
  findAll(@Query('search') search?: string): PostInterface[] {
    const allPosts = this.postsService.findAll();
    if (search) {
      return allPosts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return allPosts;
  }

  // GET /posts/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): PostInterface {
    return this.postsService.findOne(id);
  }

  // POST /posts  (returns 201 Created)
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostData: CreatePostDto): PostInterface {
    return this.postsService.create(createPostData);
  }

  // PUT /posts/:id
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostData: UpdatePostDto,
  ): PostInterface {
    return this.postsService.update(id, updatePostData);
  }

  // DELETE /posts/:id  (returns 204 No Content)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.postsService.remove(id);
  }
}
