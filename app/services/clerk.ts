import { auth, clerkClient } from "@clerk/nextjs/server";

async function getClient() {
	return await clerkClient();
}

export async function getCurrentUser() {
	const { userId, sessionClaims, redirectToSignIn } = await auth();
	return {
		clerkUserId: userId,
		userId: sessionClaims?.id,
		role: sessionClaims?.role,
		redirectToSignIn,
	};
}

export async function syncClerkUserMetaData(user: {
	id: string;
	clerkUserId: string;
	role: string;
}) {
	return (await getClient()).users.updateUserMetadata(user.clerkUserId, {
		publicMetadata: {
			dbId: user.id,
			role: user.role,
		},
	});
}
