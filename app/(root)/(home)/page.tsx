import MeetingTypeList from "@/components/MeetingTypeList";

const HomePage = () => {
  const now = new Date();

  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });

  const formattedDate = (new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  })).format(now)

  return (
    <section className="size-full flex flex-col gap-10  text-white">
      <div className="w-full h-72 rounded-xl bg-banner bg-cover">
        <article className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
          {/* <h2 className="py-2 max-w-[300px] text-center text-base bg-gray-500/40 bg-blur-sm rounded-md">
            Upcoming meeting at: 12:30 PM
          </h2> */}
          <span className="flex flex-col gap-2">
            <h1 className="text-3xl lg:text-5xl font-bold">{formattedTime}</h1>
            <p className="text-lg font-medium lg:text-xl text-gray-300">
              {formattedDate}
            </p>
          </span>
        </article>
      </div>
      <MeetingTypeList/>
    </section>
  );
};

export default HomePage;
