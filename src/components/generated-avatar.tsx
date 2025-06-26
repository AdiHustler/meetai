import {createAvatar} from "@dicebear/core";
import {botttsNeutral,initials} from "@dicebear/collection";

import {cn} from "@/lib/utils";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

interface GeneratedAvatarProps {
  seed: string;
  className?: string;
  variant?: "botttsNeutral" | "initials";
}

export const GeneratedAvatar = ({
  seed,
  className,
  variant = "botttsNeutral",
}: GeneratedAvatarProps) => {
  let avatarSvg;

  if (variant === "botttsNeutral") {
    avatarSvg = createAvatar(botttsNeutral, {
      seed,
    });
  } else {
    avatarSvg = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 42,
    });
  }

  return (
    <Avatar className={cn("h-16 w-16", className)}>
      <AvatarImage src={avatarSvg.toDataUri()} alt={seed} />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};