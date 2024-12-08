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
  isBuyPackage?: boolean;
  comments?: string[];
  followers?: string[];
  following?: string[];
  quizzesAttempted?: number;
  paymentDetails?: {
    payableAmount?: string;
    paymentMethod?: string;
    phoneNumber?: string;
  };
};

export type TUserProps = {
  user: TUser;
};
