export type ILoginErrors = {
  hasErrors?: string;
};

export type LoginResponse = {
  hasErrors: boolean;
  errors?: ILoginErrors;
};

export type LoginRequest = {
  email?: string;
  password?: string;
};
