"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Calendar, Plus, User, Video } from "lucide-react";
import MeetingModal from "./MeetingModal";
import MeetingCard from "@/components/MeetingCard";
import toast from "react-hot-toast";

const MeetingTypeList = () => {
  const router = useRouter()
  const [meetingState, setMeetingState] = 
  useState<"isJoiningMeeting" | "isInstantMeeting" | "isSchedulingMeeting" | undefined>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link:""
  })
  const [callDetails, setCallDetails] = useState<Call>()

  const {user} = useUser()
  const client = useStreamVideoClient()
  

  const createMeeting = async() => {
    if(!user || !client) return;

    try {
      const callId = crypto.randomUUID()

      const call = client.call("default", callId)

      if(!call) throw new Error("Failed to create call")

        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()

        const description = values.description || "Instant meeting"

        await call.getOrCreate({
          data: {
            starts_at: startsAt, 
            custom: {
              description
            }
          }
        })

        setCallDetails(call)

        if(!values.description) {
          router.push(`/meeting/${callId}`)
        }

        toast.success("Meeting created successfully!")
      
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <MeetingCard 
       icon={Plus}
       iconbg='bg-yellow-1'
       title="New Meeting"
       desc="Setup a new recording"
       handleClick={() => setMeetingState('isInstantMeeting')}
       className="bg-yellow-1/20"
      />
      <MeetingCard 
       icon={User}
        iconbg='bg-green-1'
       title="Join Meeting"
       desc="via invitation link"
       handleClick={() => setMeetingState('isJoiningMeeting')}
       className="bg-green-1/20"
      />
      <MeetingCard 
       icon={Calendar}
       iconbg='bg-red-1'
       title="Schedule Meeting"
       desc="Plan your meeting"
       handleClick={() => setMeetingState('isSchedulingMeeting')}
       className="bg-red-1/20"
      />
      <MeetingCard 
       icon={Video}
        iconbg='bg-blue-1'
       title="View Recordings"
       desc="Meeting recordings"
       handleClick={() => router.push("/recordings")}
       className="bg-blue-1/20"
      />

      <MeetingModal 
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        buttonText="Start Meeting"
        className="text-center"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
