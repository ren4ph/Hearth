"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "../ui/form";
import { Plus, Smile } from "lucide-react";
import { Input } from "../ui/input";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "chat" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <div className="relative p-4 pb-6">
                <button
                  type="button"
                  onClick={() => {}}
                  className="absolute top-7 left-8 h-[24px] w-[24px] bg-dark/30 dark:bg-jet/70 hover:bg-dark/40 hover:dark:bg-sslight/20 transition rounded-full p-1 flex items-center justify-between"
                >
                  <Plus className="text-white dark:text-jet" />
                </button>
                <Input
                  disabled={isLoading}
                  className="px-14 py-6 bg-beige/90 dark:brown/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-jet/60 dark:text-zinc-200"
                  placeholder={`Message ${type === "chat" ? name : "#" + name}`}
                  {...field}
                />
                <div className="absolute top-7 right-8">
                  <Smile />
                </div>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
