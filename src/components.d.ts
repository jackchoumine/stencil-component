/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Person } from "./components/my-input/MyInput";
import { RenderChildren } from "./components/app-nav/app-nav";
import { MatchResults } from "@stencil/router";
export namespace Components {
    interface AppCustomCube {
    }
    interface AppHome {
    }
    interface AppInput {
        "getValue": () => Promise<string | number>;
        "person": Person;
        "value": string | number;
    }
    interface AppNav {
        "renderChildren": RenderChildren;
    }
    interface AppProfile {
        "match": MatchResults;
    }
    interface AppRoot {
    }
}
declare global {
    interface HTMLAppCustomCubeElement extends Components.AppCustomCube, HTMLStencilElement {
    }
    var HTMLAppCustomCubeElement: {
        prototype: HTMLAppCustomCubeElement;
        new (): HTMLAppCustomCubeElement;
    };
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppInputElement extends Components.AppInput, HTMLStencilElement {
    }
    var HTMLAppInputElement: {
        prototype: HTMLAppInputElement;
        new (): HTMLAppInputElement;
    };
    interface HTMLAppNavElement extends Components.AppNav, HTMLStencilElement {
    }
    var HTMLAppNavElement: {
        prototype: HTMLAppNavElement;
        new (): HTMLAppNavElement;
    };
    interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {
    }
    var HTMLAppProfileElement: {
        prototype: HTMLAppProfileElement;
        new (): HTMLAppProfileElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLElementTagNameMap {
        "app-custom-cube": HTMLAppCustomCubeElement;
        "app-home": HTMLAppHomeElement;
        "app-input": HTMLAppInputElement;
        "app-nav": HTMLAppNavElement;
        "app-profile": HTMLAppProfileElement;
        "app-root": HTMLAppRootElement;
    }
}
declare namespace LocalJSX {
    interface AppCustomCube {
    }
    interface AppHome {
    }
    interface AppInput {
        "onInput"?: (event: CustomEvent<any>) => void;
        "onInputChanged"?: (event: CustomEvent<any>) => void;
        "person"?: Person;
        "value"?: string | number;
    }
    interface AppNav {
        "renderChildren"?: RenderChildren;
    }
    interface AppProfile {
        "match"?: MatchResults;
    }
    interface AppRoot {
    }
    interface IntrinsicElements {
        "app-custom-cube": AppCustomCube;
        "app-home": AppHome;
        "app-input": AppInput;
        "app-nav": AppNav;
        "app-profile": AppProfile;
        "app-root": AppRoot;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-custom-cube": LocalJSX.AppCustomCube & JSXBase.HTMLAttributes<HTMLAppCustomCubeElement>;
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-input": LocalJSX.AppInput & JSXBase.HTMLAttributes<HTMLAppInputElement>;
            "app-nav": LocalJSX.AppNav & JSXBase.HTMLAttributes<HTMLAppNavElement>;
            "app-profile": LocalJSX.AppProfile & JSXBase.HTMLAttributes<HTMLAppProfileElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
        }
    }
}
