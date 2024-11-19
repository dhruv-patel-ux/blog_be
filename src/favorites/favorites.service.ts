import { Injectable } from '@nestjs/common';
import { Post } from 'src/types/post.interface';

@Injectable()
export class FavoritesService {
  private favorites: Set<number> = new Set();
  private posts: Map<number, Post> = new Map();

  async findAll(): Promise<Post[]> {
    const favoritePosts: Post[] = [];
    for (const id of this.favorites) {
      if (!this.posts.has(id)) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
          const post = await response.json();
          this.posts.set(id, post);
        } catch (error) {
          console.error(`Error fetching post ${id}:`, error);
          continue;
        }
      }
      favoritePosts.push(this.posts.get(id));
    }
    return favoritePosts;
  }

  async create(postId: number): Promise<void> {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const post = await response.json();
      this.posts.set(postId, post);
      this.favorites.add(postId);
    } catch (error) {
      throw new Error(`Failed to add post ${postId} to favorites`);
    }
  }

  remove(postId: number): void {
    this.favorites.delete(postId);
  }
}
