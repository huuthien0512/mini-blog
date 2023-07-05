import { Tag } from './tag';

export interface Blog {
  id: number;
  title: string;
  htmlContent: string;
  categoryId: number;
  categoryName?: string;
  publishDate?: Date;
  state: number;
  pageView: number;
  editTime?: Date;
  dynamicTags: string[];
  nickname?: string;
  tags?: Tag[];
}

export interface BlogRecord {
  blogs: Blog[];
  totalCount: number;
}
