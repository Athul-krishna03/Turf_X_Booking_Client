import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { cn } from "../../lib/utils";
import "./calender.css"; 

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <div className={cn("p-3", className)}>
      <DayPicker
      classNames={{
        day:"text-gray-400",
        caption_label: 'text-green-500 font-medium',
        week:"text-green"
      }}
        {...props}
      />
    </div>
  );
}

Calendar.displayName = "Calendar";
export { Calendar };
