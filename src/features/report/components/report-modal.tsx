import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSubmitReport } from '@/features/post/api/use-posts';

interface ReportModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: 'post' | 'user';
    itemId: string;
    itemName: string;
}

const reportReasons = {
    post: [
        { value: 'spam', label: 'Spam atau konten menyesatkan' },
        { value: 'inappropriate', label: 'Konten tidak pantas atau menyinggung' },
        { value: 'harassment', label: 'Pelecehan atau perundungan' },
        { value: 'misinformation', label: 'Penipuan atau misinformasi' },
        { value: 'other', label: 'Pelanggaran hak cipta atau lainnya' },
    ],
    user: [
        { value: 'spam', label: 'Spam atau akun palsu' },
        { value: 'harassment', label: 'Pelecehan atau perundungan' },
        { value: 'misinformation', label: 'Peniruan identitas' },
        { value: 'inappropriate', label: 'Perilaku tidak pantas' },
        { value: 'other', label: 'Lainnya' },
    ],
};

export function ReportModal({ open, onOpenChange, type, itemId, itemName }: ReportModalProps) {
    const [selectedReason, setSelectedReason] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    const submitReport = useSubmitReport(itemId);

    const handleSubmit = () => {
        if (!selectedReason) {
            toast.error('Pilih alasan untuk melaporkan');
            return;
        }

        if (type !== 'post') {
            toast.error('Maaf, saat ini hanya laporan untuk postingan yang didukung.');
            return;
        }

        submitReport.mutate({
            reason: selectedReason,
            additional_info: additionalInfo,
        }, {
            onSuccess: () => {
                setSelectedReason('');
                setAdditionalInfo('');
                onOpenChange(false);
            }
        });
    };

    const handleCancel = () => {
        setSelectedReason('');
        setAdditionalInfo('');
        onOpenChange(false);
    };

    const reasons = reportReasons[type];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        Laporkan {type === 'post' ? 'Postingan' : 'Pengguna'}
                    </DialogTitle>
                    <DialogDescription>
                        Anda melaporkan {type === 'post' ? 'postingan' : 'pengguna'}: <strong>{itemName}</strong>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Reason Selection */}
                    <div className="space-y-3">
                        <Label>Alasan melaporkan *</Label>
                        <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                            {reasons.map((reason) => (
                                <div key={reason.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={reason.value} id={reason.value} />
                                    <Label htmlFor={reason.value} className="font-normal cursor-pointer">
                                        {reason.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-2">
                        <Label htmlFor="additionalInfo">Informasi tambahan (opsional)</Label>
                        <Textarea
                            id="additionalInfo"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            placeholder="Tuliskan detail tambahan yang dapat membantu kami meninjau laporan ini..."
                            rows={4}
                            className="resize-none"
                        />
                    </div>

                    {/* Warning Message */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs text-amber-800">
                            <strong>Harap perhatikan:</strong> Laporan palsu dapat menyebabkan tindakan terhadap akun Anda.
                            Laporan akan ditinjau oleh tim moderasi kami.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleCancel} disabled={submitReport.isPending}>
                        Batal
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={submitReport.isPending}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {submitReport.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Kirim Laporan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
