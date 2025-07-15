import Link from "next/link";
import Image from "next/image";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

interface Props {
  onLeave: () => void;
  meetingName: string;
};

export const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* Minimal header */}
      <div className="p-2 flex items-center gap-2 w-fit absolute top-2 left-2 z-10">
        <Link href="/" className="flex items-center justify-center p-1 bg-white/10 rounded-full">
          <Image src="/logo.svg" width={20} height={20} alt="logo" />
        </Link>
        <h4 className="text-lg font-medium truncate max-w-[200px]">
          {meetingName}
        </h4>
      </div>

      {/* Perfectly centered video area */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
          <SpeakerLayout 
            participantsBarPosition="bottom"
            participantsBarLimit="dynamic"
          />
        </div>
      </div>

      {/* Compact controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#101213]/80 backdrop-blur-sm rounded-full px-2 py-1">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};