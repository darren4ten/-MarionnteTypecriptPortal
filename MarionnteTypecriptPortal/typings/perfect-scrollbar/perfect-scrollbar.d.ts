/// <reference path='../jquery/jquery.d.ts'/>

interface perfectScrollbarOptions {
    wheelSpeed?: number;
    wheelPropagation?: boolean;
    minScrollbarLength?: number;
    maxScrollbarLength?: number;
    useBothWheelAxes?: boolean;
    useKeyboard?: boolean;
    suppressScrollX?: boolean;
    suppressScrollY?: boolean;
    scrollXMarginOffset?: number;
    scrollYMarginOffset?: number;
    includePadding?: boolean;
}

interface JQuery {
    perfectScrollbar(option?: perfectScrollbarOptions): void;
    // update|destroy
    perfectScrollbar(methodName?: string): void;
}