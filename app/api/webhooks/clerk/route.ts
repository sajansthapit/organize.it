import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

import { syncClerkUserMetaData } from "@/app/services/clerk";
import { PrismaClient } from "../../../generated/prisma";

export async function POST(req: Request) {
	const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

	if (!SIGNING_SECRET) {
		throw new Error(
			"Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
		);
	}

	// Create new Svix instance with secret
	const wh = new Webhook(SIGNING_SECRET);

	// Get headers
	const headerPayload = await headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error: Missing Svix headers", {
			status: 400,
		});
	}

	// Get body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	let evt: WebhookEvent;

	// Verify payload with headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error: Could not verify webhook:", err);
		return new Response("Error: Verification error", {
			status: 400,
		});
	}

	// Do something with payload
	// For this guide, log payload to console
	const { id } = evt.data;
	const eventType = evt.type;
	console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
	console.log("Webhook payload:", body);

	const prisma = new PrismaClient();

	switch (eventType) {
		case "user.created":
		case "user.updated": {
			const emailObj = evt.data.email_addresses.find(
				(email) => email.id === evt.data.primary_email_address_id
			);
			const email = emailObj?.email_address;
			const name = `${evt.data.first_name} ${evt.data.last_name}`.trim();
			if (email == null)
				return new Response("Error: No email found", { status: 400 });
			if (name == "")
				return new Response("Error: No name found", { status: 400 });

			if (eventType === "user.created") {
				const userData = {
					clerkUserId: evt.data.id, // Add clerkUserId from the event data
					email: email,
					name: name,
					role: "user",
					createdAt: new Date(),
				};
				const user = await prisma.user.create({
					data: userData,
				});
				await syncClerkUserMetaData({
					clerkUserId: evt.data.id,
					id: user.id.toString(),
					role: user.role,
				});
			}
		}
	}

	return new Response("Webhook received", { status: 200 });
}
