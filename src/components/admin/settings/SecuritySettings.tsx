"use client";

import { useState } from "react";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useFormValidation, createValidationRules } from "@/hooks/useFormValidation";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { getProducts } from "@/services/productService";
import { getOrders } from "@/services/orderService";

export default function SecuritySettings() {

    const [open, setOpen] = useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { user } = useAuth();
    const toast = useToast();
    const validation = createValidationRules();

    interface PasswordFormData {
        currentPassword: string;
        newPassword: string;
        confirmPassword: string;
    }

    const passwordForm = useFormValidation<PasswordFormData>(
        {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
        {
            currentPassword: [validation.required('Current password is required')],
            newPassword: [
                validation.required('New password is required'),
                validation.passwordMinLength(6, 'Password must be at least 6 characters'),
            ],
            confirmPassword: [validation.required('Please confirm your password')],
        }
    );

    const handleSubmit = async () => {
        if (!passwordForm.validateAll()) {
            toast.error('Please review the password fields before saving.');
            return;
        }

        if (passwordForm.values.newPassword !== passwordForm.values.confirmPassword) {
            passwordForm.setErrors((prev) => ({
                ...prev,
                confirmPassword: 'Passwords do not match',
            }));
            toast.error('The password confirmation does not match.');
            return;
        }

        if (!user) {
            toast.error('User not found.');
            return;
        }

        setIsSaving(true);
        try {
            await authService.changePassword(user.id, {
                currentPassword: passwordForm.values.currentPassword,
                newPassword: passwordForm.values.newPassword,
                confirmPassword: passwordForm.values.confirmPassword,
            });
            toast.success('Password changed successfully!');
            passwordForm.reset({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setOpen(false);
        } catch (error: unknown) {
            console.error('Error changing password:', error);
            toast.error(
                'Unable to change your password. Please check your current password.'
            );
        } finally {
            setIsSaving(false);
        }
    };

    // --- Export reports ---
    const [exporting, setExporting] = useState(false);

    function toCSV(items: Record<string, unknown>[]) {
        if (!items || items.length === 0) return '';
        const keys = Array.from(
            items.reduce((acc, item) => {
                Object.keys(item).forEach((k) => acc.add(k));
                return acc;
            }, new Set<string>())
        );
        const header = keys.join(',');
        const rows = items.map((item) =>
            keys
                .map((k) => {
                    const v = item[k];
                    if (v === null || v === undefined) return '';
                    if (typeof v === 'object') return '"' + JSON.stringify(v).replace(/"/g, '""') + '"';
                    return '"' + String(v).replace(/"/g, '""') + '"';
                })
                .join(',')
        );
        return [header, ...rows].join('\n');
    }

    function download(content: string, filename: string, mime = 'text/csv') {
        const blob = new Blob([content], { type: mime + ';charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    function downloadBlob(blob: Blob, filename: string) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }

    async function exportToXLSX(data: unknown[], filename: string) {
        try {
            // Dynamic import with proper typing
            const XLSXModule = await import('xlsx');
            const XLSX = XLSXModule.default || XLSXModule;
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = { Sheets: { Report: worksheet }, SheetNames: ['Report'] };
            const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            downloadBlob(blob, filename);
        } catch (e) {
            // Fallback to CSV
            const csv = toCSV(data as Record<string, unknown>[]);
            download(csv, filename.replace(/\.xlsx$/, '.csv'));
        }
    }

    const handleExportUsers = async () => {
        setExporting(true);
        try {
            const data = await userService.getAll();
            await exportToXLSX(data, 'users-report.xlsx');
            toast.success('Users report exported');
        } catch (error) {
            console.error('Export users error:', error);
            toast.error('Failed to export users');
        } finally {
            setExporting(false);
        }
    };

    const handleExportBooks = async () => {
        setExporting(true);
        try {
            const data = await getProducts();
            await exportToXLSX(data, 'books-report.xlsx');
            toast.success('Books report exported');
        } catch (error) {
            console.error('Export books error:', error);
            toast.error('Failed to export books');
        } finally {
            setExporting(false);
        }
    };

    const handleExportOrders = async () => {
        setExporting(true);
        try {
            const data = await getOrders();
            await exportToXLSX(data, 'orders-report.xlsx');
            toast.success('Orders report exported');
        } catch (error) {
            console.error('Export orders error:', error);
            toast.error('Failed to export orders');
        } finally {
            setExporting(false);
        }
    };

    return (

        <section className="mt-8">

            <h3 className="text-xl font-bold text-gray-900 mb-4">
                Security
            </h3>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">

                <div className="flex items-center justify-between">

                    <div className="flex items-start gap-4">

                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">

                            <ShieldCheck
                                size={24}
                                className="text-green-700"
                            />

                        </div>

                        <div>

                            <h4 className="font-semibold text-gray-900">
                                Change Password
                            </h4>

                            <p className="text-sm text-gray-500 mt-1 max-w-lg">
                                Update your administrator password to keep
                                your account secure. Choose a strong password
                                that you don´t use anywhere else.
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={() => setOpen(true)}
                        className="
                            px-5
                            py-2.5
                            rounded-xl
                            bg-green-700
                            text-white
                            font-medium
                            hover:bg-green-800
                            transition
                        "
                    >
                        Change Password
                    </button>

                </div>

            </div>

            {open && (

                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                    <div className="bg-white rounded-2xl p-8 w-full max-w-md">

                        <h2 className="text-xl font-bold mb-2">Change Password</h2>

                        <p className="text-gray-500 mb-4">Ensure your account stays secure by using a strong password.</p>

                        <div className="grid gap-4">

                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">Current Password</label>
                                <div className="relative mt-2">
                                    <input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        {...passwordForm.getFieldProps('currentPassword')}
                                        placeholder="Enter current password"
                                        className="w-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 pr-10 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                                        aria-label="Toggle current password visibility"
                                    >
                                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {passwordForm.errors.currentPassword && <p className="text-xs text-red-600 mt-1">{passwordForm.errors.currentPassword}</p>}
                            </div>

                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">New Password</label>
                                <div className="relative mt-2">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        {...passwordForm.getFieldProps('newPassword')}
                                        placeholder="Enter new password"
                                        className="w-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 pr-10 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                                        aria-label="Toggle new password visibility"
                                    >
                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {passwordForm.errors.newPassword && <p className="text-xs text-red-600 mt-1">{passwordForm.errors.newPassword}</p>}
                            </div>

                            <div>
                                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">Confirm New Password</label>
                                <div className="relative mt-2">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        {...passwordForm.getFieldProps('confirmPassword')}
                                        placeholder="Confirm new password"
                                        className="w-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 pr-10 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                                        aria-label="Toggle confirm password visibility"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {passwordForm.errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{passwordForm.errors.confirmPassword}</p>}
                            </div>

                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
                                type="button"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={isSaving}
                                className="px-5 py-2.5 rounded-xl bg-green-700 text-white font-medium hover:bg-green-800 transition disabled:opacity-70 disabled:cursor-not-allowed"
                                type="button"
                            >
                                {isSaving ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>

                    </div>

                </div>

            )}

            {/* Export Reports Section */}
            <section className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Export Reports</h3>
                <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
                    <p className="text-sm text-gray-500">Export data for external analysis. CSV format is generated from the current dataset returned by the API.</p>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleExportUsers}
                            disabled={exporting}
                            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {exporting ? 'Exporting...' : 'Export Users (CSV)'}
                        </button>

                        <button
                            onClick={handleExportBooks}
                            disabled={exporting}
                            className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
                        >
                            {exporting ? 'Exporting...' : 'Export Books (CSV)'}
                        </button>

                        <button
                            onClick={handleExportOrders}
                            disabled={exporting}
                            className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                            {exporting ? 'Exporting...' : 'Export Orders (CSV)'}
                        </button>
                    </div>
                </div>
            </section>

        </section>

    );

}