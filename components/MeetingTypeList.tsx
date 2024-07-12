"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Calendar, Check, Copy, Plus, User, Video } from "lucide-react";
import MeetingModal from "./MeetingModal";
import MeetingCard from "@/components/MeetingCard";
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isJoiningMeeting" | "isInstantMeeting" | "isSchedulingMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      const callId = crypto.randomUUID();

      const call = client.call("default", callId);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${callId}`);
      }

      toast.success("Meeting created successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      <MeetingCard
        icon={Plus}
        iconbg="bg-yellow-1"
        title="New Meeting"
        desc="Setup a new recording"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-yellow-1/20"
      />
      <MeetingCard
        icon={User}
        iconbg="bg-green-1"
        title="Join Meeting"
        desc="via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-green-1/20"
      />
      <MeetingCard
        icon={Calendar}
        iconbg="bg-red-1"
        title="Schedule Meeting"
        desc="Plan your meeting"
        handleClick={() => setMeetingState("isSchedulingMeeting")}
        className="bg-red-1/20"
      />
      <MeetingCard
        icon={Video}
        iconbg="bg-blue-1"
        title="View Recordings"
        desc="Meeting recordings"
        handleClick={() => router.push("/recordings")}
        className="bg-blue-1/20"
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isSchedulingMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-5">
              Add a description
            </label>
            <Textarea
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-dark-2"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-5">
              Selete a date and time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM dd, yyyy h:mm aa"
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isSchedulingMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          buttonText="Cope meeting link"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link copied!");
          }}
          buttonIcon={Copy}
          image="/checked.png"
        />
      )}

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
