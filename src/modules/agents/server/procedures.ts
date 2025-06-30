import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";
import { db } from "@/db";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  // Define your procedures here
  getOne: protectedProcedure.input(z.object({id:z.string()})).query(async ({ ctx, input }) => {
    const [existingAgent] = await db.select().from(agents).where(eq(agents.id, input.id));
    return existingAgent;
  }),
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const data = await db.select().from(agents);

    return data;
  }),
  create: protectedProcedure.input(agentsInsertSchema).mutation(async({input, ctx })=>{
    const [createdAgent]=await db.insert(agents).values({
      ...input,
      userId: ctx.auth.user.id,
    })
    .returning();
  })
});
