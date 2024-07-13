"use client";

import { UseGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CallCard from "./CallCard";
import {
  ChevronLeftSquare,
  ChevronRightSquare,
  Loader,
  Play,
  Video,
} from "lucide-react";
import toast from "react-hot-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const router = useRouter();
  const { endedCalls, recordingCalls, upcomingCalls, isLoading } =
    UseGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "recordings":
        return recordings;
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "recordings":
        return "No Recordings";
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
     try {
       const callData = await Promise.all(
         recordingCalls?.map((meeting) => meeting.queryRecordings()) ?? []
       );
 
       const recordings = callData
         .filter((call) => call.recordings.length > 0)
         .flatMap((call) => call.recordings);
 
       setRecordings(recordings);
     } catch {
       toast.error("Try again later");
     }
    };

    if (type === "recordings") fetchRecordings();
  }, [type, recordingCalls]);

  const calls = getCalls();
  const noCallsMessages = getNoCallsMessage();

  if (isLoading)
    return <Loader className="animate-spin text-white size-6 mt-10" />;

  return (
    <section className="grid grid-cols-1  xl:grid-cols-2 gap-5 ">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <CallCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? ChevronLeftSquare
                : type === "upcoming"
                ? ChevronRightSquare
                : Video
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "Personal Meeting"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toString()
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon1={type === "recordings" ? Play : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-xl font-medium text-white">{noCallsMessages}</h1>
      )}
    </section>
  );
};

export default CallList;
