"use client";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const NavBar: React.FC = () => {
	const { isSignedIn } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (isSignedIn) {
			router.push("/dashboard");
		}
	}, [isSignedIn, router]);

	const logoHref = isSignedIn ? "/dashboard" : "/";
	return (
		<header className="flex h-12 shadow bg-background z-10">
			<nav className="flex gap-4 container">
				<Link
					className="mr-auto text-lg hover:underline px-2 flex items-center"
					href={logoHref}
				>
					Organize.IT
				</Link>

				<SignedIn>
					<div className="size-8 self-center">
						<UserButton
							appearance={{
								elements: {
									userButtonAvatarBox: {
										width: "100%",
										height: "100%",
									},
								},
							}}
						></UserButton>
					</div>
				</SignedIn>

				<SignedOut>
					<SignInButton>SignIn</SignInButton>
				</SignedOut>
			</nav>
		</header>
	);
};
