"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { EventClickArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { dateFormat } from "../helpers/date-format";
import { getAllEvent, getEventsByUserId } from "../services/get-event";
import { EventForm } from "./events-form";
export const CalendarComponent: React.FC = () => {
	const [open, setOpen] = useState(false);

	const [loading, setLoading] = useState(true);

	const [eventArray, setEventArray] = useState<
		{ date: string; title: string; id: string }[]
	>([]);

	const [selectedEventId, setSelectedEventId] = useState("");
	const { user } = useUser();

	useEffect(() => {
		if (!user?.publicMetadata?.dbId) return;

		const fetchEvents = async () => {
			try {
				const events = await getEventsByUserId(
					Number(user.publicMetadata.dbId)
				);
				console.log("Fetched Events:", events);
				const mappedEvents = events.map((event) => ({
					title: event.title,
					date: dateFormat(new Date(event.date)),
					id: event.id.toString(),
				}));
				console.log("Mapped Events:", mappedEvents);
				setEventArray(mappedEvents);
			} catch (err) {
				console.error("Error loading events:", err);
			} finally {
				setLoading(false);
			}
		};

		const fetchAllEvents = async () => {
			try {
				const events = await getAllEvent();
				console.log("Fetched Events:", events);
				const mappedEvents = events.map((event) => ({
					title: event.title,
					date: dateFormat(new Date(event.date)),
					id: event.id.toString(),
				}));
				console.log("Mapped Events:", mappedEvents);
				setEventArray(mappedEvents);
			} catch (err) {
				console.error("Error loading events:", err);
			} finally {
				setLoading(false);
			}
		};
		if (user?.publicMetadata?.role == "user") {
			fetchEvents();
		} else {
			fetchAllEvents();
		}

		if (!open) {
			if (user?.publicMetadata?.role == "user") {
				fetchEvents();
			} else {
				fetchAllEvents();
			}
		}
	}, [user?.publicMetadata?.dbId, open]);

	const dateClick = (event: EventClickArg) => {
		setSelectedEventId(event.event.id);
		setOpen(true);
	};

	const handleDateClick = (arg: DateClickArg) => {
		console.log(arg);
	};

	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<>
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
				events={eventArray}
			/>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-3xl w-full flex flex-col justify-center items-center">
					<DialogHeader>
						<DialogTitle></DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<EventForm eventData={selectedEventId} />
				</DialogContent>
			</Dialog>
		</>
	);
};
