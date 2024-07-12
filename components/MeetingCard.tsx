import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MeetingCardProps {
    icon: LucideIcon,
    iconbg: string,
    title: string,
    desc: string,
    handleClick: () => void,
    className: string,
}

const MeetingCard = ({icon: Icon, iconbg, title, desc, handleClick, className}:MeetingCardProps) => {
  return (
    <section className={cn("w-full flex flex-col justify-between px-4 py-6 min-h-[260px] rounded-xl cursor-pointer", className)} onClick={handleClick}>
      <span className={cn("size-12 flex items-center justify-center rounded-lg", iconbg)}>
        <Icon className="text-white size-9" />
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{desc}</p>
      </div>
    </section>
  );
};

export default MeetingCard;
