"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect } from "react";
import { ChannelType } from "@prisma/client";
import qs from "query-string";
import { Mic, Text, Video } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required.",
    })
    .refine((name) => name !== "general", {
      message: 'Channel name cannot be "general"',
    }),
  type: z.nativeEnum(ChannelType),
});

const typeIconMap = {
  TEXT: <Text className="h-4 w-4 ml-auto mr-2" />,
  AUDIO: <Mic className="h-4 w-4 ml-auto mr-2" />,
  VIDEO: <Video className="h-4 w-4 ml-auto mr-2" />,
};

export const EditChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "editChannel";
  const { server, channel } = data;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (channel) {
      form.setValue("type", channel.type);
      form.setValue("name", channel.name);
    } else {
      form.setValue("name", "Name");
      form.setValue("type", ChannelType.TEXT);
    }
  }, [channel, form]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.patch(url, values);

      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
    setTimeout(() => {
      const root = document.querySelector("body");
      root?.focus();
    }, 50);
  };

  return (
    <Dialog
      key={isModalOpen ? "open" : "closed"}
      open={isModalOpen}
      onOpenChange={handleClose}
    >
      <DialogContent className="bg-light text-dark dark:bg-brown dark:text-slight p-0 overflow-hidden fixed top-1/2 left-1/2 transform translate-x-[-50%]! translate-y-[-50%]!">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold dark:text-light">
            Create Channel
          </DialogTitle>
          <DialogDescription className="text-center text-jet dark:text-sslight -mt-1.5">
            Select a name and type for your channel.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-semibold text-zinc-500 dark:text-orange pl-2 pb-0 mb-[-4px]">
                      Channel Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-beige/95 dark:bg-jet focus-visible:ring-0 text-slight/80 focus-visible:ring-offset-0"
                        placeholder="Enter channel name..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-center">
                    <FormLabel className="uppercase text-xs font-semibold text-zinc-500 dark:text-orange pl-2 pb-0 mb-[-4px]">
                      Channel Type
                    </FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="self-start">
                        <SelectTrigger className="bg-beige/95 dark:bg-jet border-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 capitalize outline-none w-[60%]">
                          <SelectValue placeholder="Select a type..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize flex flex-row justify-between bg-default hover:bg-dark/95 transition-all"
                          >
                            {typeIconMap[type]}
                            <span>{type.toLowerCase()}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-[color-mix(in_srgb,var(--color-cream),var(--color-beige)_60%)] dark:bg-brown px-6 py-4 grid justify-center align-center grid-cols-[1fr] border-t">
              <Button variant="primary" disabled={isLoading} className="w-full">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
