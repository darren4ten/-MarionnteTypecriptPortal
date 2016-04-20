// Type definitions for backbone-nested  
// created by Kodak

/// <reference path="../backbone/backbone.d.ts" />

declare module Backbone {

    class NestedModel extends Model{
        constructor(attributes?: any, options?: any);

        get(attribute: string): any;
        previous(attribute: string): any;
        has(attribute: string): boolean;
        set(obj: any, opts?: ModelSetOptions): NestedModel;
        set(attribute: string, value: any, opts?: ModelSetOptions): NestedModel;
        unset(attribute: any, opts?: Silenceable): NestedModel;
        clear(opts?: Silenceable): NestedModel;
        add(attribute: string, value: any, opts?: AddOptions): NestedModel;
        remove(attribute: string, value: any, opts?: Silenceable): NestedModel;
        changedAttributes(attributes?: any): any[];
        toJSON(): string;
    }
}

