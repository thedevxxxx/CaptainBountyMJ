import { AudioClip, AudioSource, Node } from 'cc';
import mahjongWays_AudioPlayer from './mahjongWaysAudioPlayer';

export class mahjongWaysAudio {

    private node: Node;

    private audioPlayers: Array<mahjongWays_AudioPlayer>;

    private bgmAudioPlayer: mahjongWays_AudioPlayer;

    private isMute: boolean;

    public constructor(node: Node) {
        this.isMute = false;
        this.node = node;
        this.audioPlayers = new Array<mahjongWays_AudioPlayer>();

        this.bgmAudioPlayer = this.getAudioPlayer();
    }

    public destroy() {
        this.bgmAudioPlayer.destroy();
        this.audioPlayers.forEach(audioPlayer => {
            audioPlayer.destroy();
        });
        this.audioPlayers.length = 0;
        this.audioPlayers = null;
    }

    public playBGM(audioClip: AudioClip) {
        const audioPlayer = this.bgmAudioPlayer;
        if (audioPlayer.isPlaying && (audioPlayer.audioSource.clip === audioClip)) {
            console.log("[mahjongWays_Audio] same bgm");
            return;
        }
        console.log(`[mahjongWays_Audio] playBGM ${audioClip.name}`);
        audioPlayer.stop();
        audioPlayer.play(audioClip, true);
    }

    public playByClipPart(clipPart: ClipPart, onCompletedOnce?: Function) {
        if (clipPart == null) {
            console.log("[mahjongWays_Audio] clipPart is null when executing playByClipPart");
            return;
        }
        const audioPlayer = this.getAudioPlayer();
        audioPlayer.playByClipPart(clipPart, onCompletedOnce);
        return audioPlayer;
    }

    public stopAllAudioPlayers() {
        this.bgmAudioPlayer.stop();
        this.audioPlayers.forEach(audioPlayer => {
            audioPlayer.stop();
        });
    }

    public muteBGM(isMute: boolean) {
        this.bgmAudioPlayer.mute(isMute);
    }

    public muteAll(isMute: boolean) {
        this.isMute = isMute;
        this.audioPlayers.forEach(audioPlayer => {
            audioPlayer.mute(isMute);
        });
        this.muteBGM(isMute);
    }

    private getAudioPlayer(): mahjongWays_AudioPlayer {
        let audioPlayer: mahjongWays_AudioPlayer;
        audioPlayer = this.audioPlayers.find(audioPlayer => audioPlayer.isPlaying === false);
        if (audioPlayer == null) {
            audioPlayer = this.createAudioPlayer();
            this.audioPlayers.push(audioPlayer);
        }
        audioPlayer.isPlaying = true;
        return audioPlayer;
    }

    private createAudioPlayer() {
        const audioSource = this.node.addComponent(AudioSource);
        audioSource.loop = false;
        audioSource.playOnAwake = false;
        const audioPlayer = new mahjongWays_AudioPlayer({
            audioSource: audioSource,
            timeout: null,
            isPlaying: true
        });
        audioPlayer.mute(this.isMute);
        return audioPlayer;
    }
}

export interface ClipPart {

    audioClip: AudioClip;

    name: string;

    startTime: number;

    endTime: number;

    isLoop?: boolean;
}