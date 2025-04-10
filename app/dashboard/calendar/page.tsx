import { CalendarComponent } from "@/app/components/calendar";
import { EventForm } from "@/app/components/events-form";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function CalendarPage() {
	return (
		<div className="border-2 p-8 rounded-lg shadow-md flex flex-col gap-4">
			<div>
				<Dialog>
					<DialogTrigger>New</DialogTrigger>
					<DialogContent className="max-w-3xl w-full flex flex-col justify-center items-center">
						<DialogHeader>
							<DialogTitle></DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<EventForm />
					</DialogContent>
				</Dialog>
			</div>
			<div>
				<CalendarComponent />
			</div>
		</div>
	);
}
