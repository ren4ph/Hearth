import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "chat";
}

export const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-grey/95 dark:bg-dark flex items-center justify-center">
          <Hash className="h-12 w-12 dark:text-zinc-200/90 text-light" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold text-dark/90 dark:text-zinc-100/90">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
};
