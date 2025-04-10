"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Events } from "../models/event";
import { getEventById } from "../services/get-event";
import { handleSaveEvent, handleUpdateEvent } from "../services/save-event";

type EventFormProps = {
	eventData: string;
};

export const EventForm: React.FC<EventFormProps> = ({ eventData }) => {
	const { user } = useUser();
	const [event, setEvent] = useState<{
		id: number;
		date: string;
		title: string;
		location: string;
		description: string;
	}>({ id: 0, date: "", title: "", location: "", description: "" });

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!eventData || eventData === "") {
			setLoading(false);
			return;
		}

		const fetchEvent = async () => {
			try {
				const event = await getEventById(Number(eventData));
				console.log(event);

				const mappedEvent = {
					id: Number(event?.id),
					title: event?.title ?? "",
					location: event?.location ?? "",
					date: event?.date.toString() ?? "",
					description: event?.description ?? "",
				};
				console.log("Mapped Event:", mappedEvent);
				setEvent(mappedEvent);
			} catch (error) {
				console.error("Error fetching event data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchEvent();
	}, [eventData]);

	const formSchema = z.object({
		title: z.string().min(1, {
			message: "Event title is required",
		}),
		description: z.string().min(1, {
			message: "Event description is required",
		}),
		date: z.string().min(1, {
			message: "Event date is required",
		}),
		location: z.string().min(1, {
			message: "Event location is required",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
			date: "",
			location: "",
		},
	});

	useEffect(() => {
		if (event) {
			// Set event data if event is present
			form.reset({
				title: event.title ?? "",
				description: event.description ?? "",
				date: event.date
					? new Date(event.date).toISOString().split("T")[0]
					: "",
				location: event.location ?? "",
			});
		}
	}, [event, form]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		const eventData: Events = {
			title: values.title,
			description: values.description,
			date: values.date,
			location: values.location,
			id: event.id != 0 ? event.id : 0,
			createdAt: "",
			createdBy: user?.publicMetadata.dbId as number,
		};
		if (eventData.id != 0) {
			handleUpdateEvent(eventData);
		} else handleSaveEvent(eventData);

		// form.resetFields();
	}

	if (loading) {
		return <h1>Loading</h1>;
	}

	return (
		<Card className="w-[600px] sm:w-[650px] p-3">
			<CardHeader>
				<CardTitle>Event</CardTitle>
				<CardDescription>Create New Event</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Event Title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input placeholder="Event Description" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="location"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<FormControl>
										<Input placeholder="Event Location" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="date"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date</FormLabel>
									<FormControl>
										<Input type="date" placeholder="Event Date" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};
