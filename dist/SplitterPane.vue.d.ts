import Vue from 'vue';
declare type StyleType = 'width' | 'height';
export default class SplitterPane extends Vue {
    dragging: boolean;
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
    initialPercentChanged(): void;
    onThrottleChanged(): void;
    updateHandler(): void;
    created(): void;
    mounted(): void;
    readonly userSelect: string;
    readonly cursor: string;
    readonly type: StyleType;
    readonly slotOne: string;
    readonly slotTwo: string;
    readonly isVertical: boolean;
    updateSizes(): void;
    onClick(): void;
    onMouseDown(): void;
    onMouseUp(): void;
    onMouseMove(e: MouseEvent): void;
    doResize(e: MouseEvent): void;
}
export {};
