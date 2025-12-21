import React from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LogoutProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const LogoutModal: React.FC<LogoutProps> = ({
  open,
  handleOk,
  handleCancel,
}) => {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={(isOpen: boolean) => !isOpen && handleCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex justify-center items-center flex-col w-full mb-4">
            <LogOut className="h-28 w-28 p-12 text-muted-foreground" />
          </div>
          <AlertDialogTitle className="text-center">
            Oh no! You're leaving...
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Are you sure you want to logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleOk}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
