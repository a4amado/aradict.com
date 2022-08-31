import React from 'react';

interface constraintes {
  audio: boolean;
  video: boolean;
}

const useRecorder = (constraintes: constraintes) => {
  const chunks = React.useRef([]);
  const mediaStream = React.useRef<MediaStream>(null);
  const mediaRecorder = React.useRef<MediaRecorder>(null);
  const [blob, setBlob] = React.useState<Blob>();
  const [url, setURL] = React.useState<string>();
  const [isRecording, setisRecording] = React.useState<boolean>(false);
  const isEmpty = React.useMemo(() => {
    const e = !blob?.size|| !url?.length ? true : false;
    return e;
  }, [blob, url])

  async function StartRecording() {
    if (!mediaStream.current) mediaStream.current = await getStream();
    mediaRecorder.current = new MediaRecorder(mediaStream.current);
    mediaRecorder.current.ondataavailable = ({ data }: BlobEvent) => {
      chunks.current.push(data);
    };
    mediaRecorder.current.onstart = () => {
      chunks.current = [];
      setisRecording(true);
    };

    mediaRecorder.current.onstop = () => {
      const b: Blob = new Blob(chunks.current);
      setBlob(b);
      const l = URL.createObjectURL(b);
      setURL(l);
      setisRecording(false);
      mediaRecorder.current = null;
      mediaStream.current = null;
    };
    mediaRecorder.current.start();
  }

  function StopRecording() {
    if (!mediaRecorder.current) return false;

    const isRecording = mediaRecorder.current.state === "recording";
    if (!isRecording) return false;
    mediaRecorder.current.stop();
    mediaStream.current.getTracks().map((track: MediaStreamTrack): void => {
      const isTrackActive = track.readyState === "live";
      if (isTrackActive) track.stop();
    });
  }

  function reset() {

    if (isRecording) StopRecording()
    if (chunks.current) chunks.current = []
    if (blob?.size) setBlob(null);
    if (url) setURL(null)

  }

  const getStream = React.useCallback(async () => {
    return await navigator.mediaDevices.getUserMedia(constraintes);
  }, [constraintes]);

  return {
    StartRecording,
    StopRecording,
    chunks: chunks.current,
    isRecording,
    blob,
    url,
    isEmpty,
    reset
  };
};

export default useRecorder;
