export type TUser = {
  firstname: string;
  lastname: string;
  password: string;
  profilePhoto?: string;
  role: "admin" | "user";
  userId: string;
  iat: number;
  exp: number;
  userName?: string;
  _id?: string;
  fullname?: string;
  createdAt?: string;
  email?: string;
  isBlocked?: boolean;
  packageExpiry?: Date | null;
  packageType?: string;
  isPremium?: boolean;
  isAdmin?: boolean;
  isBuyPackage?: boolean;
  packagePointsUsed?: boolean;
  comments?: string[];
  followers?: string[];
  following?: string[];
  quizzesAttempted?: number;
  totalPoints?: number;
  pointsDeducted?: number;
  paymentDetails?: {
    payableAmount?: string;
    paymentMethod?: string;
    phoneNumber?: string;
    points: number;
  };
};

export type TUserProps = {
  user: TUser;
};
