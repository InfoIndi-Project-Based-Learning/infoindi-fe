export interface Post {
  id: string;
  name: string;
  bannerImage: string;
  additionalImages: string[];
  description: string; // HTML content from rich text editor
  category_id?: string;
  category?: string;
  authorId?: string;
  authorName?: string;
  authorEmail?: string;
  authorAvatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Profile {
  user_id: string;
  avatar: string;
  bio: string;
  instagram?: string;
  website?: string;
  address?: string;
  phone_number?: string;
}
