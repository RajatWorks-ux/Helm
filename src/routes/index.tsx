import { createFileRoute } from "@tanstack/react-router";
import { HelmApp } from "@/components/helm-app";

export const Route = createFileRoute("/")({
  component: HelmApp,
});
