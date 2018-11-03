import Vue from 'vue';
declare type StyleType = 'width' | 'height';
export default class SplitterPane extends Vue {
    active: boolean;
    hasMoved: boolean;
    percent: Number;
    sizes: number[];
    handler: (e: MouseEvent) => void;
    $refs: {
        one: Vue;
        two: Vue;
    };
    minPercent: number;
    throttle: number;
    maxPercent: number;
    initialPercent: number;
    split: string;
    xClass: string;
    sizesChanged(): void;
    percentChanged(): void;
    onThrottleChanged(): void;
    throttleChanged(): void;
    created(): void;
    mounted(): void;
    readonly userSelect: string;
    readonly cursor: string;
    readonly type: StyleType;
    readonly isVertical: boolean;
    updateSizes(): void;
    onClick(): void;
    onMouseDown(): void;
    onMouseUp(): void;
    onMouseMove(e: MouseEvent): void;
    doThrottle(e: MouseEvent): void;
    doResize(e: MouseEvent): void;
}
export {};
