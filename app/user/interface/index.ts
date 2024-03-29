import { BaseResponsePagination } from "@/lib/axiosClient";

interface User {
  id: number;
  nama: string;
  email: string;
  umur: string | number | undefined;
  tanggal_lahir: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface UserListResponse extends BaseResponsePagination {
  data: User[];
}

export interface UserListFilter extends Partial<User> {
  from_umur?: any;
  to_umur?: any;
  page: number;
  pageSize: number;
}

export interface UserCreatePayload
  extends Pick<User, "nama" | "email" | "umur" | "tanggal_lahir" | "status"> {}

export interface UserCreateResponse {
  status: string;
  message: string;
  data?: User;
}

export interface UserDetailResponse extends User {}
export interface UserUpdateResponse extends UserCreateResponse {}
export interface UserUpdatePayload
  extends Pick<
    User,
    "id" | "nama" | "email" | "umur" | "tanggal_lahir" | "status"
  > {};

export interface UserCreateArrayPayload {
  data: UserCreatePayload[];
}

export interface UserDeleteArrayPayload {
  delete: number[];
}