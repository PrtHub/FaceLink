"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();

  const localParticant = useLocalParticipant();

  const isMeetingOwner =
    localParticant &&
    call?.state.createdBy &&
    localParticant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  return (
    <Button
      onClick={async () => {
        await call.endCall();
        router.push("/");
      }}
      className="bg-red-500 rounded-xl"
      variant={"default"}
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;
