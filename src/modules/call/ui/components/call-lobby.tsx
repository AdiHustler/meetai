import { LogInIcon } from "lucide-react";
import { DefaultVideoPlaceholder, StreamVideoParticipant, ToggleAudioPreviewButton, ToggleVideoPreviewButton, useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { generateAvatarUri } from "@/lib/avatar";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { GeneratedAvatar } from "@/components/generated-avatar";

interface Props { 
  onJoin: () => void;
};

const DisabledVideoPreview = () => {
  const {data} = authClient.useSession();

  return (
    <DefaultVideoPlaceholder 
      participant={
        {
          name: data?.user.name?? "",
          image:
            data?.user.image ??
            generateAvatarUri({
              seed:data?.user.name??"",
              variant: "initials",
            }),
        }as StreamVideoParticipant
      }
    />
  )
}
const AllowBrowserPermission = () =>{
  return (
    <p className="text-sm">
      Please grant your browser a permission to access your camera and microphone
    </p>
  )
}

export const CallLobby = ({onJoin}:Props) => {
  const { useCameraState, useMicrophoneState} = useCallStateHooks();
  const { hasBrowserPermission: hasMicPermission} = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission} = useCameraState();

  const hasBrowserMediaPermission = hasCameraPermission && hasMicPermission;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-radial from-sidebar-accent to-sidebar">
      <div className="flex-1 w-full py-4 px-8 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join?</h6>
            <p className="text-sm">Setup your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermission ? DisabledVideoPreview : AllowBrowserPermission
            }
          />
          <div className="flex gap-x-2">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex gap-x-2 justify-between w-full">
            <Button asChild variant="ghost">
              <Link href="/meetings">
                Cancel
              </Link>
            </Button>
            <Button 
              onClick={onJoin}
            >
              Join Call
              <LogInIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}