export type LoginResponse = {
  account: {
    id: number;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
  };
  user: {
    id: number;
    email: string;
    name: string;
    dob: string;
  };
  token: string;
  isEmailVerified?: boolean;
};
