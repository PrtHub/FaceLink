import { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  buttonText?: string;
  className?: string;
  handleClick?: () => void;
  children?: React.ReactNode;
  image?: string;
  buttonIcon?: LucideIcon;
}

const MeetingModal = ({
  isOpen,
  onClose,
  buttonText,
  title,
  className,
  handleClick,
  buttonIcon: Icon,
  image,
  children,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full flex flex-col max-w-[520px] border-none gap-6 px-6 py-9 bg-dark-1 text-white">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex items-center justify-center">
              <Image
                src={image}
                alt={title}
                width={72}
                height={72}
                className=""
              />
            </div>
          )}
          <h1 className={cn("text-2xl font-semibold", className)}>{title}</h1>
          {children}
          <Button
            className="bg-green-1 hover:bg-green-1/80 focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={handleClick}
          > 
            {Icon && <Icon className="size-4" />} &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
