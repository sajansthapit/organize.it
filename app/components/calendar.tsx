"use client";
import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
export const CalendarComponent: React.FC = () => {
	const dateClick = (event: EventClickArg) => {
		console.log(event);
	};

	const handleDateClick = (arg: DateClickArg) => {
		console.log(arg);
	};

	return (
		<FullCalendar
			plugins={[
				resourceTimelinePlugin,
				dayGridPlugin,
				interactionPlugin,
				timeGridPlugin,
			]}
			headerToolbar={{
				left: "prev,next today",
				center: "title",
				right: "resourceTimelineWeek,dayGridMonth,timeGridWeek",
			}}
			eventClick={dateClick}
			dateClick={handleDateClick}
			nowIndicator={true}
			editable={true}
			selectable={true}
			selectMirror={true}
			initialView="dayGridMonth"
			events={[
				{
					title: "event 1",
					date: "2025-04-01 14:15",
					color: "red",
					editable: true,
					end: "2025-04-02",
				},
				{ title: "event 2", date: "2025-04-02" },
			]}
		/>
	);
};
