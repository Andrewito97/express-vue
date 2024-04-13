export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type CreateUser = Omit<User, 'id'>;
