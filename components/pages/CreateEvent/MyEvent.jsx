import Events from "@components/All_Event/Events";
import React from "react";

const MyEvent = () => {
  return (
    <div className="w-full h-auto flex flex-col font-bold text-lg">
      <h2 className="text-2xl">My Events</h2>
      <Events 
        gaps = "gap-8"
        EventCreator = "yes"
        nameClass = "w-full justify-between"
        widthE="w-full"
      />
    </div>
  );
};

export default MyEvent;