// Declarative WebMCP: https://developer.chrome.com/docs/ai/webmcp/declarative-api
import "react";

declare module "react" {
  interface FormHTMLAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolautosubmit?: "";
  }

  interface InputHTMLAttributes<T> {
    toolparamdescription?: string;
  }

  interface TextareaHTMLAttributes<T> {
    toolparamdescription?: string;
  }
}

declare global {
  interface SubmitEvent {
    readonly agentInvoked?: boolean;
    respondWith?(result: Promise<unknown>): void;
  }
}
