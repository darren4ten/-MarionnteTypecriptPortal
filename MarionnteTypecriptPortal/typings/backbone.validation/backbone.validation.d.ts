// Type definitions for backbone-nested  
// created by Kodak

/// <reference path="../backbone/backbone.d.ts" />

declare module Backbone {

    interface Validation {
        configure(options?: any): void;
        bind(view: any, options?: any): void;
        unbind(view: any, options?: any): void;
    }

    module Validation {
        var version: string;
        function configure(options?: any): void;
        function bind(view: any, options?: any): void;
        function unbind(view: any, options?: any): void;
        var mixins: any; 
    }
} 