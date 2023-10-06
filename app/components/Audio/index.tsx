import ReactAudioPlayer from "react-audio-player";

export const AudioPlayer = () => {
    return (
        <ReactAudioPlayer
            src="som_latinha.mp3"
            autoPlay
            controls
        />
    );
};