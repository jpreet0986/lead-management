import React, { Component } from "react";

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export function dateToNiceString(myDate) {
  myDate = new Date(myDate);
  return (
    <p>
      {month[myDate.getMonth()] +
        " " +
        myDate.getDate() +
        " " +
        myDate.getFullYear()}
    </p>
  );
}
