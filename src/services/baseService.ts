import axiosInstance from "../libs/axios";
import type { ApiParams, ApiResponse, PaginatedResponse } from "../types/api";

const apiService = {
  get: async <TData>(
    url: string,
    params?: ApiParams,
  ): Promise<ApiResponse<TData>> => {
    const res = await axiosInstance.get<ApiResponse<TData>>(url, { params });
    return res.data;
  },
  getAll: async <TData>(
    url: string,
    params?: ApiParams,
  ): Promise<PaginatedResponse<TData>> => {
    const res = await axiosInstance.get<PaginatedResponse<TData>>(url, {
      params,
    });
    return res.data;
  },
  post: async <TData, TPayload>(
    url: string,
    payload: TPayload,
  ): Promise<ApiResponse<TData>> => {
    const res = await axiosInstance.post<ApiResponse<TData>>(url, payload);
    return res.data;
  },
  put: async <TData, TPayload>(
    url: string,
    payload: TPayload,
  ): Promise<ApiResponse<TData>> => {
    const res = await axiosInstance.put<ApiResponse<TData>>(url, payload);
    return res.data;
  },
  delete: async <TData>(url: string): Promise<ApiResponse<TData>> => {
    const res = await axiosInstance.delete<ApiResponse<TData>>(url);
    return res.data;
  },
};

export default apiService;
