"use server";

import prisma from "@/lib/prisma";

export async function getEventsByUserId(id: number) {
	const events = await prisma.event.findMany({
		where: {
			createdBy: id,
		},
		orderBy: {
			date: "desc",
		},
	});
	return events;
}

export async function getAllEvent() {
	const events = await prisma.event.findMany({
		orderBy: {
			date: "desc",
		},
	});
	return events;
}

export async function getEventById(id: number) {
	const event = await prisma.event.findUnique({
		where: {
			id: id,
		},
	});
	return event;
}

export async function getTotalEventsCountByUserId(id: number) {
	const eventsCount = await prisma.event.count({
		where: {
			createdBy: id,
		},
	});
	return eventsCount;
}

export async function getAllTotalEventsCount() {
	const eventsCount = await prisma.event.count();
	return eventsCount;
}

export async function getAllTodayEventsCountByUserId(id: number) {
	const today = new Date();
	const lessDate = new Date(today);
	lessDate.setDate(today.getDate() - 1);

	// One day after
	const greaterDate = new Date(today);
	greaterDate.setDate(today.getDate() + 1);

	const eventsCount = await prisma.event.count({
		where: {
			createdBy: id,
			date: {
				gte: lessDate,
				lt: greaterDate,
			},
		},
	});
	return eventsCount;
}

export async function getAllTodayEventsCount() {
	const today = new Date();
	const lessDate = new Date(today);
	lessDate.setDate(today.getDate() - 1);

	// One day after
	const greaterDate = new Date(today);
	greaterDate.setDate(today.getDate() + 1);

	const eventsCount = await prisma.event.count({
		where: {
			date: {
				gte: lessDate,
				lt: greaterDate,
			},
		},
	});
	return eventsCount;
}
