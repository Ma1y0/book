import { createFileRoute } from "@tanstack/react-router";
import Loader from "~/components/loader";

export const Route = createFileRoute("/dev/loader-ui")({
  component: Loader
});
