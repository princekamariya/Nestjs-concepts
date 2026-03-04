// posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'First post content',
      authorName: 'Sum',
      createdAt: new Date(),
    },
  ];

  // Helper: generate next ID
  private getNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((p) => p.id)) + 1
      : 1;
  }

  // GET all posts
  findAll(): Post[] {
    return this.posts;
  }

  // GET single post by ID
  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} is not found`);
    }
    return post;
  }

  // POST — create new post
  create(createPostData: Omit<Post, 'id' | 'createdAt'>): Post {
    const newPost: Post = {
      id: this.getNextId(),
      ...createPostData,
      createdAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  // PUT — update post
  update(
    id: number,
    updatePostData: Partial<Omit<Post, 'id' | 'createdAt'>>,
  ): Post {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with id ${id} is not found`);
    }
    this.posts[postIndex] = {
      ...this.posts[postIndex],
      ...updatePostData,
      updatedAt: new Date(),
    };
    return this.posts[postIndex];
  }

  // DELETE
  remove(id: number): string {
    const postIndex = this.posts.findIndex((p) => p.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with id ${id} is not found`);
    }
    this.posts.splice(postIndex, 1);
    return `Post with id ${id} has been deleted`;
  }
}
