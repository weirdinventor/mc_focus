import { Category } from './Category';

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  authorId: string;
  groupId: string;
  category: Category;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
