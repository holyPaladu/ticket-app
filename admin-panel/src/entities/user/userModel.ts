export type UserRole = "admin" | "user";
export type FieldType = "text" | "email" | "select" | "number" | "password";
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
export type ColumnDefinition<T> = {
  key: keyof T;
  type: FieldType;
  options?: string[];
  disabled?: boolean;
};
