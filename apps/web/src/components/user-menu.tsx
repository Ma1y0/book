import { Link } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function UserMenu() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="h-9 w-24" />;
  }

  if (!session) {
    return (
      <Button asChild>
        <Link to="/auth/signin">Sign In</Link>
      </Button>
    );
  }
}
