import { Pagination } from './Pagination';
import { Post } from './Post';

export interface FeedPosts {
  posts: Post[];
  pagination: Pagination;
}
