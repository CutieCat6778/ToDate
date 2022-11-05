export interface DateInterface {
  _id: string;
  createdAt: DateInterface;
  duration?: number;
  title?: string;
  date: DateInterface;
  content: string;
  location?: string;
  contributors?: string[];
  public: {
    type: boolean;
    required: true;
  };
}

export interface PostInterface {
  _id: string;
  event: DateInterface;
  visibility: number;
  cancelled: boolean;
  author: string;
  createdAt: string;
}

export interface UserInterface {
  _id: string;
  username: string;
  password: string;
  avatar: string;
  bio?: string;
  createdAt: DateInterface;
  calendar: DateInterface;
  posts: PostInterface;
  salt: string;
  refreshToken?: string;
}

export interface SensoredUserInterface {
  username: string;
  avatar: string;
  bio?: string;
  createdAt: DateInterface;
  calendar: DateInterface;
  posts: PostInterface;
}

export interface ErrorInterface {
  name: string;
  code: number;
}

export interface TokenInterface {
  accessToken?: string;
  refreshToken?: string;
}

export interface ResponseInterface {
  success: boolean;
  status: number;
  name: string;
  user?: UserInterface;
  token?: TokenInterface;
}

export interface SensoredResponseInterface {
  success: boolean;
  status: number;
  name: string;
  user?: SensoredUserInterface;
  token?: TokenInterface;
}
