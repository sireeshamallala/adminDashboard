export interface UserQueryParams {
  page: number;
  limit: number;
  search: string;
  sort: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface UserApiResponse {
  success: boolean;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  data: User[];
}
