"use server";
import prisma from "@/lib/prisma";
import { Events } from "../models/event";

export async function handleSaveEvent(event: Events) {
	const date = new Date(event.date);
	await prisma.event.create({
		data: {
			title: event.title,
			description: event.description,
			location: event.location,
			date: date,
			createdAt: new Date(Date.now()), // Add the current timestamp for createdAt
			user: { connect: { id: Number(event.createdBy) } },
		},
	});
}


export async function handleUpdateEvent(event: Events) {
	const date = new Date(event.date);
	await prisma.event.update({
		where: {
			id: event.id,
		},
		data: {
			title: event.title,
			description: event.description,
			location: event.location,
			date: date,
			user: { connect: { id: Number(event.createdBy) } },
		},
	});
}