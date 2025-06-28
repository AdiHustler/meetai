import { createTRPCRouter,baseProcedure } from "@/trpc/init";
import { agents } from "@/db/schema";
import { db } from "@/db";

export const agentsRouter = createTRPCRouter({
  // Define your procedures here
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data=await db.select().from(agents);

    


    return data;
  }),
});
