"Collection of Utility funcitons";
import React from "react";

// toLocaleString()
export function dateToNiceString(myDate) {
  myDate = new Date(myDate);
  return (
    <p>
      {myDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true
      })}
    </p>
  );
}
