"use client";

import { UseGetCalls } from "@/hooks/useGetCalls";
import { Call } from "@stream-io/video-react-sdk";

const Upcoming = () => {
  const { upcomingCalls } = UseGetCalls();

  const calls = upcomingCalls;

  return (
    <div>
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call) => (
          <h1
            className="py-2 w-fit px-4 text-start text-base bg-gray-500/40 bg-blur-sm rounded-md"
            key={(meeting as Call).id}
          >
            Upcoming meeting on {" "}
            {(meeting as Call).state?.startsAt?.toLocaleString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            })}
          </h1>
        ))
      ) : (
        <h1>No Upcoming calls</h1>
      )}
    </div>
  );
};

export default Upcoming;
