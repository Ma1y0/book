import { Link, useNavigate } from "@tanstack/react-router";
import { authClient } from "~/lib/auth-client";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

export function UserMenu() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Skeleton className="h-9 w-24" />;
  }

  if (!session) {
    return (
      <Button asChild>
        <Link to="/login">Sign In</Link>
      </Button>
    );
  }
}
