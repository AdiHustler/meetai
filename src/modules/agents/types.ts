import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";


export type AgentsGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];