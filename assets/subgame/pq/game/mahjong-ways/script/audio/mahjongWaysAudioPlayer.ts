import { AudioClip, AudioSource, isValid } from "cc";
import { ClipPart } from "./mahjongWaysAudio";

export default class mahjongWaysAudioPlayer {

    public isPlaying: boolean;

    public audioSource: AudioSource;

    private timeout: ReturnType<typeof setTimeout>;

    public constructor(audioPlayerParameter: AudioPlayerParameter) {
        const audioSource = audioPlayerParameter.audioSource;
        const timeout = audioPlayerParameter.timeout;
        const isPlaying = audioPlayerParameter.isPlaying;

        this.audioSource = audioSource;
        this.timeout = timeout;
        this.isPlaying = isPlaying;
    }

    public destroy() {
        this.stop();
        this.isPlaying = null;
        this.audioSource = null;
        this.timeout = null;
    }

    public playByClipPart(clipPart: ClipPart, onCompletedOnce?: Function) {
        const audioSource = this.audioSource;
        const duration = (clipPart.endTime - clipPart.startTime);
        const isLoop = (clipPart.isLoop == null) ? false : clipPart.isLoop;

        if (audioSource.playing) {
            audioSource.stop();
        }
        audioSource.clip = clipPart.audioClip;
        audioSource.currentTime = clipPart.startTime;
        audioSource.play();
        this.timeout = setTimeout(() => {
            if (isLoop) {
                this.playByClipPart(clipPart);
            } else {
                this.stop();
            }
            onCompletedOnce?.();
        }, duration * 1000);
    }

    public stop() {
        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        const audioSource = this.audioSource;
        if (audioSource != null) {
            if (isValid(audioSource.node, true)) {
                audioSource.stop();
                audioSource.clip = null;
            }
        }

        this.isPlaying = false;
    }

    public play(audioClip: AudioClip, isLoop: boolean) {
        this.isPlaying = true;
        const audioSource = this.audioSource;
        audioSource.loop = isLoop;
        audioSource.clip = audioClip;
        audioSource.play();
    }

    public mute(isMute: boolean) {
        if (isMute) {
            this.audioSource.volume = 0;
        } else {
            this.audioSource.volume = 1;
        }
    }
}

interface AudioPlayerParameter {

    audioSource: AudioSource;

    timeout: ReturnType<typeof setTimeout>;

    isPlaying: boolean;
}