import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { useTokenStore } from "../../store/store";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import Logout from "../logout";
import { useRouter } from "next/navigation";

const Details = ({}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    router.push("/logout");
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <Card className="p-4 hover:shadow-md transition-shadow">
        <Link
          href={
            process.env.NEXT_PUBLIC_DASHBOARD_URL
              ? process.env.NEXT_PUBLIC_DASHBOARD_URL
              : "https://dashboard.thrico.com/"
          }
        >
          <div className="flex items-center">
            <LayoutDashboard className="h-5 w-5" />
            <p className="ml-5 mb-0 text-sm">View Dashboard</p>
          </div>
        </Link>
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <Link href="#">
          <div className="flex items-center">
            <Settings className="h-5 w-5" />
            <p className="ml-5 mb-0 text-sm">Manage Settings</p>
          </div>
        </Link>
      </Card>

      <Card className="p-4 hover:shadow-md transition-shadow">
        <Link href="#">
          <div className="flex items-center cursor-pointer" onClick={showModal}>
            <LogOut className="h-5 w-5" />
            <p className="ml-5 mb-0 text-sm">Logout</p>
          </div>
        </Link>
      </Card>
      <Logout open={open} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  );
};

export default Details;
