import { AgentsGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { agentsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"
import { GeneratedAvatar } from "@/components/generated-avatar";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


interface AgentFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  initialValues?: AgentsGetOne;
};

export const AgentForm = ({ onSuccess, onCancel, initialValues }: AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async()=>{
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions()
        );
        if(initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess();
      },
      onError:(error)=>{
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    defaultValues:{
      name:initialValues?.name || "",
      instructions:initialValues?.instructions || "",
    },
    resolver:zodResolver(agentsInsertSchema),
  });

  const isEdit = !! initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit && initialValues?.id) {
      // Handle update logic here
      console.log("Update agent with values:", values);
      // You can call a mutation to update the agent
    } else {
      createAgent.mutate(values);
    }
  };
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <GeneratedAvatar seed={form.watch("name")} variant="botttsNeutral" className="border size-16" />
        <FormField 
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field} placeholder="Enter agent name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea
                  {...field} placeholder="Enter the instructions for the agent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button variant="ghost" onClick={() => onCancel()} disabled={isPending} type="button">
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update Agent" : "Create Agent"}
          </Button>
        </div>
      </form>
    </Form>
  )
};
