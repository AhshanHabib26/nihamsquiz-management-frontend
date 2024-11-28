export type TBlog = {
  _id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  likes: string[];
  user?: {
    fullname: string;
  };
  category: TCategory;
  slug: string;
  viewsCount: number;
  likesCount: number;
  createdAt?: string;
  comments?: TComment[];
};

export type TBlogProps = {
  post: TBlog;
  index?: number;
  deleteHandler?: (id: string) => void;
};

export type TCategory = {
  _id: string;
  title: string;
};

export type TCategoryProps = {
  category: TCategory;
};

export type TComment = {
  _id: string;
  description: string;
  user: {
    initials: string;
    fullname: string;
  };
  createdAt: string;
};

export type TQuiz = {
  _id: string;
  title: string;
  description: string;
  questions: {
    questionText: string;
    options: string[];
    correctOption: string;
    explanation?: string;
  }[];
  duration: number;
  tags?: string[];
  difficultyLevel: string;
  createdAt?: string;
  category?: {
    name: string;
  };
};

export type TQuizProps = {
  quiz: TQuiz;
  deleteHandler?: (id: string) => void;
};

export type TQuizCategory = {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  image: string;
};
export type TQuizCategoryProps = {
  category: TQuizCategory;
  setSelectedCategory?: (categoryId: string) => void;
  index?: number;
};
