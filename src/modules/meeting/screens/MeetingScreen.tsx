import { useState, useEffect, useRef, type JSX } from "react"
import { MeetingProvider, useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useGetMeQuery } from "../../../react-query/queries/user/userQueries";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, ChevronLeft, ChevronRight, PhoneOff, Phone, MicOff, Mic } from "lucide-react";

export const MeetingScreen = ({ }): JSX.Element => {
  const location = useLocation();
  const state = (location.state || {}) as { token?: string, streamType?: string, meetingId?: string };
  const token = state.token ?? '';
  const meetingId = state.meetingId ?? '';
  const streamType = state.streamType ?? 'VIEWER';
  const { data: me } = useGetMeQuery();
  return (
    <MeetingProvider
      config={{
        debugMode: true,
        meetingId: meetingId,
        micEnabled: streamType !== "live",
        webcamEnabled: false,
        name: me?.username || '',
        participantId: me?.id || '',
        mode: streamType === 'live' ? 'RECV_ONLY' : 'SEND_AND_RECV',
      }}
      token={token}
    >
      <MeetingRoom />
    </MeetingProvider>
  );
};

export const MeetingRoom = (): JSX.Element => {
  const { join, leave, participants, meeting } = useMeeting();
  const [joined, setJoined] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStreamEnabled = (stream: { kind: string; track: MediaStreamTrack }) => {
      if (stream.kind === "audio") {
        const audio = new Audio();
        audio.srcObject = new MediaStream([stream.track]);
        audio.autoplay = true;
        audio.play().catch((error) => {
          console.error("Failed to play audio stream:", error);
        });
      }
      if (stream.kind === "share") {
        const container = document.getElementById("screenshare-container");
        if (container) {
          const video = document.createElement("video");
          video.srcObject = new MediaStream([stream.track]);
          video.autoplay = true;
          video.playsInline = true;
          video.style.width = "100%";
          video.style.height = "100%";
          container.appendChild(video);
        }
      }
    };
    const handleStreamDisabled = (stream: { kind: string; track: MediaStreamTrack }) => {
      if (stream.kind === "share") {
        const container = document.getElementById("screenshare-container");
        if (container) {
          container.innerHTML = "";
        }
      }
    };
    meeting?.on("stream-enabled", handleStreamEnabled);
    meeting?.on("stream-disabled", handleStreamDisabled);
    return () => {
      meeting?.off("stream-enabled", handleStreamEnabled);
      meeting?.off("stream-disabled", handleStreamDisabled);
    };
  }, [meeting]);

  const handleJoin = () => {
    join();
    setJoined(true);
  };

  const handleLeave = () => {
    leave();
    setJoined(false);
  };

  const { localParticipant } = useMeeting();
  const { micStream } = useParticipant(localParticipant?.id || '');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && micStream) {
      audioRef.current.srcObject = new MediaStream([micStream.track]);
    }
  }, [micStream]);

  const [muted, setMuted] = useState(false);
  const toggleMute = () => setMuted((prev) => !prev);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 25%, #1a1a1a 35%, #2a3a2a 45%, #405c57ff 55%, #E79C1C 75%, #6BE1DF 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="text-black hover:bg-gradient-to-br from-black via-[#405c57ff] via-[#E79C1C] via-[#E79C1C] to-[#6BE1DF] p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            <div className="flex items-center flex-1 min-w-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Users className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-white text-lg lg:text-xl font-semibold truncate">
                  Salle De Réunion
                </h1>
              </div>
            </div>
            {/* Sidebar toggle for mobile */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white hover:bg-black/20 p-2 rounded-lg transition-colors"
            >
              {sidebarOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Meeting Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 lg:p-8 flex-1 overflow-hidden pb-24">
            <div className="max-w-full flex flex-col h-full space-y-6">

              {/* Screen Share Container */}
              <div id="screenshare-container" className="w-full flex-1 bg-black rounded-lg overflow-hidden"></div>
            </div>
          </div>
        </div>

        {/* Participants Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'
          } lg:w-80 bg-white border-l border-gray-200 flex-shrink-0 transition-all duration-300 ease-in-out overflow-hidden`}>
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Participants ({participants.size})
                </h2>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-1 rounded"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Participants List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {[...participants.keys()].map((participantId) => (
                  <ParticipantView key={participantId} participantId={participantId} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Button (when closed) */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg border border-gray-200 rounded-l-lg p-2 hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="relative bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex justify-center gap-4 z-30">
        {joined ? (
          <div className="flex gap-2">
            <button
              onClick={handleLeave}
              disabled={!joined}
              className={`px-4 py-2 rounded-lg font-medium transition text-white `}
              style={{ backgroundColor: '#E53E3E' }}
            >
              <PhoneOff className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
            {micStream && (
              <>
                <audio
                  ref={audioRef}
                  autoPlay
                  muted={muted}
                />
                  <button className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium transition" onClick={toggleMute}>
                    {muted ? <MicOff className="w-5 h-5 lg:w-6 lg:h-6" /> : <Mic className="w-5 h-5 lg:w-6 lg:h-6" />} 
                  </button>
              </>
            )}
          </div>) :
          <button
            onClick={handleJoin}
            disabled={joined}
            className={`flex gap-1 px-4 py-2 rounded-lg font-medium transition ${joined
              ? "bg-gray-400 cursor-not-allowed text-black"
              : "bg-green-600 hover:bg-green-700 text-black"
              }`}
          >
            <Phone className="w-5 h-5 lg:w-6 lg:h-6" />
            Rejoindre
          </button>
        }

      </div>
    </div>
  );
};

const ParticipantView = ({ participantId }: { participantId: string }) => {
  const { webcamStream, displayName } = useParticipant(participantId);
  const { localParticipant } = useMeeting();


  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-[#405c57ff] via-[#E79C1C] to-[#6BE1DF] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
          <span className="text-white text-sm font-medium">
            {displayName?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-gray-900 truncate">
            {displayName}
            {participantId === localParticipant?.id && (
              <span className="text-xs text-gray-500 ml-1">(You)</span>
            )}
          </h3>
        </div>
      </div>

      {webcamStream ? (
        <div className="mb-3">
          <video
            autoPlay
            playsInline
            muted={participantId === localParticipant?.id}
            className="w-full h-32 rounded-md object-cover bg-black"
            ref={(ref) => {
              if (ref) ref.srcObject = new MediaStream([webcamStream.track]);
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};