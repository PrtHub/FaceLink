"use client";

import { useEffect, useState } from "react";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetUpComplete,
}: {
  setIsSetUpComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

  const call = useCall();

  if (!call)
    throw new Error("usecall must be used within StreamCall component");

  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center gap-3 text-white">
      <h1 className="font-bold text-2xl">Setup</h1>
      <VideoPreview />
      <div className="h-16 flex items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="bg-green-1 text-white hover:bg-green-1/80 rounded-md px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetUpComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </section>
  );
};

export default MeetingSetup;
