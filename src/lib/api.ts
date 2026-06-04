import type { ApiParams, ApiResponse, PaginatedResponse } from "@/types/api";
import axiosInstance from "./axios";

const api = {
  get: async <TData>(
    url: string,
    params?: ApiParams,
  ): Promise<ApiResponse<TData>> => {
    const res = await axiosInstance.get<ApiResponse<TData>>(url, { params });
    return res.data;
  },
  getPaginated: async <TData>(
    url: string,
    params?: ApiParams,
  ): Promise<PaginatedResponse<TData>> => {
    const res = await axiosInstance.get<PaginatedResponse<TData>>(url, {
      params,
    });
    return res.data;
  },
  post: async <TData, TBody>(
    url: string,
    data: TBody,
  ): Promise<ApiResponse<TData>> => {
    const res = await axiosInstance.post<ApiResponse<TData>>(url, data);
    return res.data;
  },
  put: async <TData, TBody>(
    url: string,
    data: TBody,
  ): Promise<ApiResponse<TData>> => {
    const res = await axiosInstance.put<ApiResponse<TData>>(url, data);
    return res.data;
  },
  delete: async <TData>(url: string): Promise<ApiResponse<TData>> => {
    const res = await axiosInstance.delete<ApiResponse<TData>>(url);
    return res.data;
  },
};

export default api;
