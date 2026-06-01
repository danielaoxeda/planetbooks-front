import {ReactNode} from "react";
import AdminSidebar from "../dashboard/AdminSidebar";
import AdminHeader from "../dashboard/AdminHeader";

interface Props {
    children: ReactNode;
}

export default function AdminLayout({children}: Props) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar/>

            <main className="flex-1 md:ml-64 flex flex-col">
                <AdminHeader/>

                <div className="p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}