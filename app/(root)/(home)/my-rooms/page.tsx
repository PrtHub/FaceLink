"use client";

import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Copy, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col xl:flex-row gap-2 items-start">
    <h1 className="text-base font-base text-green-100 lg:text-lg xl:min-w-32">
      {title}:
    </h1>
    <p className="text-sm font-semibold truncate max-sm:w-[320px] lg:text-xl">
      {description}
    </p>
  </div>
);

const MyRooms = () => {
  const router = useRouter();
  const { user } = useUser();
  const meetingId = user?.id;

  const client = useStreamVideoClient();

  const { call, isCallLoading } = useGetCallById(meetingId!);

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`);
    toast.success("meeting created!");
  };

  if (isCallLoading)
    return <Loader className="animate-spin size-6 text-white mt-5" />;

  return (
    <section className=" size-full flex flex-col gap-10  text-white">
      <h1 className="text-3xl font-bold">My Room</h1>

      <div className="w-full xl:max-w-[900px]  flex flex-col gap-8">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={`${meetingId}`} />
        <Table title="Invite Link" description={`${meetingLink}`} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-green-1 hover:bg-green-1/80" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-dark-3 hover:bg-dark-3/80"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link copied!");
          }}
        >
          <Copy className="size-4 mr-1" /> Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default MyRooms;
