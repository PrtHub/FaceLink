import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import toast from "react-hot-toast";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");

  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="left" />;
    }
  };

  return (
    <section className="relative h-screen w-full  overflow-hidden  pt-4 text-white">
      <div className="relative size-full flex  items-center justify-center">
        <div className="size-full flex max-w-[1000px]  items-center">
          <CallLayout />
        </div>
        <div
          className={cn(" h-[calc(100vh-72px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
        <div className="fixed bottom-0 w-full gap-5 flex items-center justify-center flex-wrap">
          <CallControls onLeave={() => {
             router.push('/')
             toast.success("you have left from the meeting!")
          }}/>

          <DropdownMenu>
            <div className="flex items-center justify-center">
              <DropdownMenuTrigger className="cursor-pointer bg-[#19232d] hover:bg-[#19232d]/80 rounded-2xl px-4 py-2 ">
                <LayoutList className="size-5 text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="bg-dark-1 border-dark-1 border text-white">
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() =>
                      setLayout(item.toLowerCase() as CallLayoutType)
                    }
                  >
                    {item}
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className=" cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
              <Users size={20} className="text-white" />
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
