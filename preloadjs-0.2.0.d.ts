module createjs
{
export class AbstractLoader
    {
        // properties
    canceled: bool;
    loaded: bool;
    progress: number;

        // methods
    cancel(): void;
    getItem(): Object;
    load(): void;

        // events
    onComplete: () => any;
    onError: () => any;
    onFileLoad: () => any;
    onFileProgress: () => any;
    onLoadStart: () => any;
    onProgress: () => any;
    }


export class PreloadJS extends AbstractLoader
    {
    constructor( useXHR2?: bool );

        // properties
    static CSS: string;
    static IMAGE: string;
    static JAVASCRIPT: string;
    static JSON: string;
    maintainScriptOrder: bool;
    next: PreloadJS;
    static SOUND: string;
    stopOnError: bool;
    static TEXT: string;
    static TIMEOUT_TIME: number;
    useXHR: bool;
    static XML: string;

        // methods
    BrowserDetect(): Object;
    close(): void;
    getResult( value: string ): Object;
    initialize( useXHR: bool ): void;
    installPlugin( plugin: () => any ): void;
    load(): void;
    loadFile( file: Object, loadNow: bool ): void;
    loadFile( file: string, loadNow: bool ): void;
    loadManifest( manifest: Object[], loadNow: bool ): void;
    loadManifest( manifest: string[], loadNow: bool ): void;
    setMaxConnections( value: number ): void;
    setPaused( value: bool ): void;
    }


export class TagLoader extends AbstractLoader
    {
    constructor( item: Object, srcAttr: string, useXHR: bool );
    constructor( item: string, srcAttr: string, useXHR: bool );
    }


export class XHRLoader extends AbstractLoader
    {
    constructor( file: Object );
    }
}