import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Flag, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { useAdminReports, useUpdateReportStatus } from "../api/use-admin";

export function ReportManagement() {
  const { data: reports = [], isLoading } = useAdminReports();
  const updateStatus = useUpdateReportStatus();
  
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const handleOpenDetail = (report: any) => {
    setSelectedReport(report);
    setAdminNotes(report.admin_notes || "");
    setNewStatus(report.status);
    setIsDetailOpen(true);
  };

  const handleUpdateStatus = () => {
    if (selectedReport) {
      updateStatus.mutate({
        id: selectedReport.id,
        status: newStatus,
        admin_notes: adminNotes,
      }, {
        onSuccess: () => {
          setIsDetailOpen(false);
        }
      });
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    reviewed: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    dismissed: "bg-gray-100 text-gray-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "Menunggu",
    reviewed: "Ditinjau",
    resolved: "Selesai",
    dismissed: "Ditolak",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manajemen Laporan</h1>
        <p className="text-gray-600">Tinjau dan tangani laporan dari pengguna</p>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-2" />
            <p className="text-gray-500">Memuat data laporan...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pelapor</TableHead>
                <TableHead>Alasan</TableHead>
                <TableHead>Item Dilaporkan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Tidak ada laporan ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((report: any) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="font-medium">{report.user?.name}</div>
                      <div className="text-xs text-gray-500">{report.user?.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.reason}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">Postingan: <span className="font-medium">{report.post?.post_name}</span></div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[report.status]}>
                        {statusLabels[report.status] || report.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(report.created_at), { addSuffix: true, locale: id })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenDetail(report)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Dialog Detail Laporan */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-red-600" />
              Detail Laporan
            </DialogTitle>
            <DialogDescription>
              Tinjau laporan dan ambil tindakan yang sesuai
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Pelapor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold">
                      <Link to={`/users/${selectedReport.user?.username}`} target="_blank" className="hover:underline text-blue-600">
                        {selectedReport.user?.name}
                      </Link>
                    </p>
                    <p className="text-xs text-gray-500">{selectedReport.user?.email}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Penulis Postingan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold">
                      <Link to={`/users/${selectedReport.post?.user?.username}`} target="_blank" className="hover:underline text-blue-600">
                        {selectedReport.post?.user?.name}
                      </Link>
                    </p>
                    <p className="text-xs text-gray-500">{selectedReport.post?.user?.email}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold">Konten Postingan Dilaporkan</Label>
                <div className="p-4 bg-gray-50 rounded-lg border text-sm">
                  <h4 className="font-bold mb-1">
                    <Link to={`/post/${selectedReport.post?.id}`} target="_blank" className="hover:underline text-blue-600">
                      {selectedReport.post?.post_name}
                    </Link>
                  </h4>
                  <div className="line-clamp-3 text-gray-600 mb-2" dangerouslySetInnerHTML={{ __html: selectedReport.post?.description }} />
                  {selectedReport.post?.banner_url && (
                    <img src={selectedReport.post.banner_url} alt="Banner" className="w-full h-32 object-cover rounded" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-red-600">Alasan & Info</Label>
                <div className="p-4 bg-red-50 rounded-lg border border-red-100 text-sm">
                  <Badge variant="destructive" className="mb-2">{selectedReport.reason}</Badge>
                  <p className="text-gray-700">{selectedReport.additional_info || "Tidak ada info tambahan."}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Perbarui Status</Label>
                  <Select value={newStatus} onValueChange={(value) => setNewStatus(value || "")}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Menunggu</SelectItem>
                      <SelectItem value="reviewed">Ditinjau</SelectItem>
                      <SelectItem value="resolved">Selesai</SelectItem>
                      <SelectItem value="dismissed">Ditolak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan Admin</Label>
                  <Textarea
                    id="notes"
                    placeholder="Masukkan catatan penyelesaian..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Batal</Button>
            <Button onClick={handleUpdateStatus} disabled={updateStatus.isPending}>
              {updateStatus.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
