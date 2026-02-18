export interface UserQueryParams {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  order: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}
export interface Pagination {
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface UserApiResponse {
  success: boolean;
  data: User[];
  pagination: Pagination;
}
