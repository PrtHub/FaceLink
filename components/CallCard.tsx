"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { Copy, LucideIcon } from "lucide-react";
import toast from "react-hot-toast";

interface CallCardProps {
  icon: LucideIcon;
  title: string;
  date: string;
  isPreviousMeeting?: boolean;
  link: string;
  buttonIcon1?: LucideIcon;
  buttonText?: string;
  handleClick: () => void;
}

const CallCard = ({
  buttonText,
  date,
  icon: Icon,
  handleClick,
  link,
  title,
  isPreviousMeeting,
  buttonIcon1: ButtonIcon,
}: CallCardProps) => {
  return (
    <section className="w-full flex min-h-[258px] flex-col  justify-between rounded-[14px]  bg-dark-3 px-5 py-8">
      <article className="flex flex-col gap-5">
        <Icon size={30} className="text-white " />
        <span className="flex flex-col gap-2">
          <h1 className="font-semibold text-2xl">{title}</h1>
          <p className="font-normal text-base">{date}</p>
        </span>
      </article>
      <article className="flex justify-center relative">
        <div className="flex relative w-full max-sm:hidden">
          <Image src={"/avatars.png"} alt="" width={150} height={40} />
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2 items-center">
            <Button onClick={handleClick} className="rounded-md bg-green-1 hover:bg-green-1/80  px-6 ">
              {ButtonIcon && <ButtonIcon size={20} />}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link copied!");
              }}
              className="bg-[#252A41] hover:bg-[#252A41]/80  px-6"
            >
              <Copy className="size-4 mr-1" /> Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default CallCard;
