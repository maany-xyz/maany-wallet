import { ReactNode } from "react";

export type Header =
  | {
      mode: "intro";
    }
  | {
      mode: "empty";
    }
  | {
      mode: "welcome";
      title: string;
      paragraph: string;
    }
  | {
      mode: "step";
      title: string;
      paragraphs?: (string | ReactNode)[];
      stepCurrent: number;
      stepTotal: number;
    }
  | {
      mode: "direct";
      title?: string;
      paragraphs?: (string | ReactNode)[];
    };

export interface HeaderContext {
  setHeader(header: Header): void;
  header: Header;
}
