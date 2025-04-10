import { DashboardCards } from "../components/dashboard-cards";
import { EventForm } from "../components/events-form";
export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardCards />
			<div className="p-12">
				<EventForm />
			</div>
		</div>
	);
}
