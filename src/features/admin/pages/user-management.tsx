import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Search,
  UserCheck,
  UserX,
  Shield,
  Loader2,
} from "lucide-react";
import { useAdminUsers, useBanUser, useUnbanUser } from "../api/use-admin";

export function UserManagement() {
  const [search, setSearch] = useState("");
  const { data: users = [], isLoading } = useAdminUsers({ search });
  const banUser = useBanUser();
  const unbanUser = useUnbanUser();

  const handleBan = (userId: string) => {
    banUser.mutate(userId);
  };

  const handleUnban = (userId: string) => {
    unbanUser.mutate(userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manajemen Pengguna</h1>
          <p className="text-gray-600">Kelola pengguna platform dan perannya</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari pengguna..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-2" />
            <p className="text-gray-500">Memuat data pengguna...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Bergabung</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Tidak ada pengguna ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.profile?.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={user.role === "admin" ? "bg-purple-50 border-purple-200 text-purple-700" : ""}
                      >
                        {user.role === "admin" ? "Admin" : "Pengguna"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {user.is_active ? "Aktif" : "Diblokir"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          {user.is_active ? (
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => handleBan(user.id)}
                              disabled={banUser.isPending}
                            >
                              <UserX className="mr-2 h-4 w-4" />
                              Blokir Pengguna
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-green-600"
                              onClick={() => handleUnban(user.id)}
                              disabled={unbanUser.isPending}
                            >
                              <UserCheck className="mr-2 h-4 w-4" />
                              Buka Blokir
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Ubah Peran
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
