import { useState, type JSX } from "react"
import { MeetingProvider, useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useGetMeQuery } from "../../../react-query/queries/user/userQueries";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";

export const MeetingScreen = ({ }): JSX.Element => {
  const location = useLocation();
  const state = (location.state || {}) as { token?: string, streamType?: string, meetingId?: string};
  const token = state.token ?? '';
  const meetingId = state.meetingId ?? '';
  const streamType = state.streamType ?? 'VIEWER';
  const { data: me } = useGetMeQuery();
  return (
    <MeetingProvider
      config={{
        debugMode: true,
        meetingId: "zfth-k807-obcr",
        micEnabled: true,
        webcamEnabled: false,
        name: me?.username || '',
        participantId: me?.id || '',
        mode: 'SEND_AND_RECV',
      }}
      token={token}
    >
          <MeetingRoom />
    </MeetingProvider>
  );
};



export const MeetingRoom = (): JSX.Element => {
  const { join, leave, participants } = useMeeting();
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();

  const handleJoin = () => {
    join();
    setJoined(true);
  };

  const handleLeave = () => {
    leave();
    setJoined(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      {/* Header */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 25%, #1a1a1a 35%, #2a3a2a 45%, #405c57ff 55%, #E79C1C 75%, #6BE1DF 100%)' }}>
      <div className="max-w-7xl mx-auto">
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
                  Meeting Room
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Join/Leave Controls */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 flex justify-center gap-4">
            <button
              onClick={handleJoin}
              disabled={joined}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                joined
                  ? "bg-gray-400 cursor-not-allowed text-black"
                  : "bg-green-600 hover:bg-green-700 text-black"
              }`}
            >
              {joined ? "Joined" : "Join Meeting"}
            </button>

            <button
              onClick={handleLeave}
              disabled={!joined}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                !joined
                  ? "bg-gray-400 cursor-not-allowed text-black"
                  : "bg-red-600 hover:bg-red-700 text-black"
              }`}
            >
              Leave
            </button>
          </div>

          {/* Participants */}
          <div>
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">
              Participants
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...participants.keys()].map((participantId) => (
                <ParticipantView key={participantId} participantId={participantId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useRef, useEffect } from "react";

const ParticipantView = ({ participantId }: { participantId: string }) => {
  const { webcamStream, displayName, micStream } = useParticipant(participantId);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const toggleMute = () => setMuted((prev) => !prev);
  const { localParticipant } = useMeeting();

  useEffect(() => {
    if (audioRef.current && micStream) {
      audioRef.current.srcObject = new MediaStream([micStream.track]);
    }
  }, [micStream]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center">
      <h3 className="font-medium text-base text-gray-900 mb-2">{displayName}</h3>
      {webcamStream ? (
        <video
          autoPlay
          playsInline
          className="w-full rounded-md"
          ref={(ref) => {
            if (ref) ref.srcObject = new MediaStream([webcamStream.track]);
          }}
        />
      ) : (
        <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-md text-gray-500">
          No Video
        </div>
      )}
      {micStream && (
        <>
          <audio
            ref={audioRef}
            autoPlay
            muted={muted}
          />
          {participantId === localParticipant?.id && (
            <button
              className="mt-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
              onClick={toggleMute}
            >
              {muted ? "Unmute" : "Mute"}
            </button>
          )}
        </>
      )}
    </div>
  );
};