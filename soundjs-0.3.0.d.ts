module createjs
{
export class FlashPlugin
    {
        // properties
    static BASE_PATH: string;
    static capabilities: Object;
    showOutput: bool;

        // methods
    create( src: string ): SoundInstance;
    static generateCapabilities(): void;
    static isSupported(): bool;
    register( src: string, instances: number ): Object;
    }

export class HTMLAudioPlugin
    {
        // properties
    static capabilities: Object;
    static MAX_INSTANCES: number;

        // methods
    create( src: string ): SoundInstance;
    static generateCapabilities(): void;
    static isSupported(): bool;
    register( src: string, instances: number ): Object;
    }

export class SoundInstance
    {
    constructor( src: string );

        // properties
    muted: bool;
    owner: HTMLAudioPlugin;
    paused: bool;
    playState: string;
    src: string;
    uniqueId: string;   //HERE string or number

        // methods
    getDuration(): number;
    getPan(): number;
    getPosition(): number;
    getVolume(): number;
    mute( isMuted: bool ): bool;
    pause(): bool;
    play( interrupt: string, delay: number, offset: number, loop: number, volume: number, pan: number ): void;
    resume(): bool;
    setPan( value: number ): number;
    setPosition( value: number ): void;
    setVolume( value: number ): bool;
    stop(): bool;

        // events
    onComplete: () => any;
    onLoop: () => any;
    onPlayFailed: () => any;
    onPlayInterrupted: () => any;
    onReady: () => any;
    }


export class SoundJS
    {
        // properties
    static activePlugin: Object;
    static AUDIO_TIMEOUT: number;
    static DELIMITER: string;
    static INTERRUPT_ANY: string;
    static INTERRUPT_EARLY: string;
    static INTERRUPT_LATE: string;
    static INTERRUPT_NONE: string;
    static muted: bool;
    static PLAY_FAILED: string;
    static PLAY_FINISHED: string;
    static PLAY_INITED: string;
    static PLAY_INTERRUPTED: string;
    static PLAY_SUCCEEDED: string;

        // methods
    static checkPlugin( initializeDefault: bool ): bool;
    static getCapabilities(): Object;
    static getCapability( key: string );    //HERE can return string | number | bool
    static getInstanceById( uniqueId: string ): SoundInstance;
    static getMasterVolume(): number;
    static getSrcFromId( value: string ): string;
    static isReady(): bool;
    static pause( id: string ): void;
    static play( value: string, interrupt?: string, delay?: number, offset?: number, loop?: number, volume?: number, pan?: number ): SoundInstance;
    static registerPlugin( plugin: Object ): bool;
    static registerPlugins( plugins: Object[] ): bool;
    static resume( id: string ): void;
    static setMasterVolume( value: number ): bool;
    static setMute( isMuted: bool, id: string ): bool;
    static setVolume( value: number, id?: string ): bool;
    static stop( id?: string ): bool;
    }
}
