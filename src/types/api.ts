export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  status: boolean;
  message: string;
  data: {
    items: T;
    meta: {
      current_page: number;
      per_page: number;
      first_item: number;
      last_item: number;
    };
  };
}

export interface ApiError {
  status: boolean;
  message: string;
  errors?: unknown;
}

export interface ApiParams {
  per_page?: number;
  search?: number;
  sort_by?: string;
  order_by?: "asc" | "desc";
}
