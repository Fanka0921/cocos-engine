import { Root } from '../core/root';
import { GFXWindow } from '../gfx/window';
import { Camera } from '../renderer/scene/camera';

export enum RenderViewPriority {
    GENERAL = 100,
}

export interface IRenderViewInfo {
    camera: Camera;
    name: string;
    priority: number;
}

export class RenderView {

    public get name () {
        return this._name;
    }

    public get window () {
        return this._window;
    }

    public set window (val) {
        this._window = val;
    }

    public get priority () {
        return this._priority;
    }

    public set visibility (vis) {
        this._visibility = vis;
    }
    public get visibility () {
        return this._visibility;
    }

    public get camera () {
        return this._camera!;
    }

    public static registerCreateFunc (root: Root) {
        root._createViewFun = (_root: Root, _camera: Camera): RenderView => new RenderView(_root, _camera);
    }

    private _root: Root;
    private _name: string = '';
    private _window: GFXWindow | null = null;
    private _priority: number = 0;
    private _visibility: number = 0;
    private _camera: Camera | null = null;
    private _isEnable: boolean = true;

    private constructor (root: Root, camera: Camera) {
        this._root = root;
        this._camera = camera;
    }

    public initialize (info: IRenderViewInfo): boolean {

        this._name = info.name;
        this._priority = info.priority;

        return true;
    }

    public destroy () {
        this._window = null;
        this._priority = 0;
        this._camera = null;
    }

    public resize (width, height) {

    }

    public enable (isEnable: boolean) {
        this._isEnable = isEnable;
    }

    public isEnable (): boolean {
        return this._isEnable;
    }
}
