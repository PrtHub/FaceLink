"use client"

import { UseGetCalls } from '@/hooks/useGetCalls';
import { Call } from '@stream-io/video-react-sdk';

const Upcoming = () => {
  const { upcomingCalls } = UseGetCalls();

  const sortedCalls = upcomingCalls.sort((a: Call, b: Call) => {
    const dateA = new Date(a.state?.startsAt || 0);
    const dateB = new Date(b.state?.startsAt || 0);
    return dateA.getTime() - dateB.getTime();
  });

  const closestCall = sortedCalls[0];

  return (
    <div>
      {closestCall ? (
        <h1
          className="py-2 w-fit px-4 text-start text-base bg-gray-500/40 bg-blur-sm rounded-md"
          key={closestCall.id}
        >
          Upcoming meeting on {' '}
          {new Date(closestCall.state?.startsAt || '').toLocaleString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </h1>
      ) : (
        <h1 className="py-2 w-fit px-4 text-start text-base bg-gray-500/40 bg-blur-sm rounded-md">
          No Upcoming calls
        </h1>
      )}
    </div>
  );
};

export default Upcoming;
