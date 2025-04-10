"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
	getAllTodayEventsCount,
	getAllTodayEventsCountByUserId,
	getAllTotalEventsCount,
	getTotalEventsCountByUserId,
} from "../services/get-event";
export const DashboardCards: React.FC = () => {
	const { user } = useUser();

	const [loading, setLoading] = useState(false);
	const [totalEventCountByUser, setTotalEventCountByUser] = useState(0);
	const [totalTodayEventCountByUser, setTotalTodayEventCountByUser] =
		useState(0);

	const [totalEventCount, setTotalEventCount] = useState(0);
	const [totalTodayEventCount, setTotalTodayEventCount] = useState(0);

	useEffect(() => {
		if (user) {
			const fetchTotalEventCountByUser = async () => {
				await getTotalEventsCountByUserId(Number(user?.publicMetadata?.dbId))
					.then((res) => {
						setTotalEventCountByUser(res);
					})
					.finally(() => {
						setLoading(false);
					});
			};
			fetchTotalEventCountByUser();

			const fetchTotalTodayEventCountByUser = async () => {
				await getAllTodayEventsCountByUserId(Number(user?.publicMetadata?.dbId))
					.then((res) => {
						console.log(res);
						setTotalTodayEventCountByUser(res);
					})
					.finally(() => {
						setLoading(false);
					});
			};
			fetchTotalTodayEventCountByUser();

			if (user?.publicMetadata?.role === "admin") {
				const fetchTotalEventCount = async () => {
					await getAllTotalEventsCount()
						.then((res) => {
							setTotalEventCount(res);
						})
						.finally(() => {
							setLoading(false);
						});
				};
				fetchTotalEventCount();

				const fetchTotalTodayEventCount = async () => {
					await getAllTodayEventsCount()
						.then((res) => {
							setTotalTodayEventCount(res);
						})
						.finally(() => {
							setLoading(false);
						});
				};
				fetchTotalTodayEventCount();
			}
		}
	}, [
		totalEventCountByUser,
		totalTodayEventCountByUser,
		totalEventCount,
		totalTodayEventCount,
		user,
	]);

	if (loading) {
		return <h1>loading</h1>;
	}
	return (
		<div className="w-full flex flex-wrap justify-around gap-4 p-4">
			<Card className="w-[300px] sm:w-[350px]">
				<CardHeader>
					<CardTitle>Total Events</CardTitle>
					<CardDescription>My Total Event Counts</CardDescription>
				</CardHeader>
				<CardContent>{totalEventCountByUser}</CardContent>
				<CardFooter></CardFooter>
			</Card>

			<Card className="w-[300px] sm:w-[350px]">
				<CardHeader>
					<CardTitle>Today's Events</CardTitle>
					<CardDescription>My Today's Event Count</CardDescription>
				</CardHeader>
				<CardContent>{totalTodayEventCountByUser}</CardContent>
				<CardFooter></CardFooter>
			</Card>

			{user?.publicMetadata.role === "admin" && (
				<>
					<Card className="w-[300px] sm:w-[350px]">
						<CardHeader>
							<CardTitle>Total Events</CardTitle>
							<CardDescription> Total Event Count</CardDescription>
						</CardHeader>
						<CardContent>{totalEventCount}</CardContent>
						<CardFooter></CardFooter>
					</Card>
					<Card className="w-[300px] sm:w-[350px]">
						<CardHeader>
							<CardTitle>Today's Total Events</CardTitle>
							<CardDescription>Today's Total Event Count</CardDescription>
						</CardHeader>
						<CardContent>{totalTodayEventCount}</CardContent>
						<CardFooter></CardFooter>
					</Card>
				</>
			)}
		</div>
	);
};
