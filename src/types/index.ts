
export interface User {
  id: string;
  name: string;
  email: string;
  specialization: string;
  bio: string;
  avatar?: string;
  createdAt: Date;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  specialization: string;
  memberCount: number;
  createdBy: string;
  createdAt: Date;
  image?: string;
}

export interface Member {
  userId: string;
  communityId: string;
  role: 'admin' | 'member';
  joinedAt: Date;
}

export interface Post {
  id: string;
  content: string;
  userId: string;
  communityId: string;
  createdAt: Date;
  likes: number;
  comments: number;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: Date;
}
