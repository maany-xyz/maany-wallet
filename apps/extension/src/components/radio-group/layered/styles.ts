import styled, { css } from "styled-components";
import { ColorPalette } from "../../../styles";

export const LayeredStyles = {
  Container: styled.div<{
    size: "default" | "large";
    isNotReady: boolean;
  }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-color: ${ColorPalette["black"]};
    border-width: 2px;
    border-style: solid;
    border-color: ${ColorPalette["gray-950"]};

    box-shadow: none;

    ${({ size }) => {
      switch (size) {
        case "large": {
          return css`
            height: 3rem;
            border-radius: 2rem;
            padding: 0 0.15625rem;
          `;
        }
        default: {
          return css`
            height: 1.875rem;
            border-radius: 0.9375rem;
            padding: 0 0.125rem;
          `;
        }
      }
    }};
  `,
  Button: styled.button<{
    size: "default" | "large";
    selected: boolean;
    itemMinWidth?: string;
    isNotReady: boolean;
  }>`
    position: relative;
    ${({ selected, isNotReady }) => {
      if (selected && isNotReady) {
        return css`
          ::after {
            content: "";

            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;

            border-radius: 999999px;
            background-color: ${ColorPalette["gray-950"]};

            z-index: 999999;
          }
        `;
      }
    }}

    flex: ${({ itemMinWidth }) => (itemMinWidth ? undefined : 1)};

    display: flex;
    align-items: center;
    justify-content: center;

    min-width: ${({ itemMinWidth }) => itemMinWidth};

    ${({ selected }) => {
      if (selected) {
        return css`
          cursor: auto;
          background-color: ${ColorPalette["gray-950"]};
          color: ${ColorPalette.white};
        `;
      }
      return css`
        cursor: pointer;
        background-color: ${ColorPalette["black"]};
        color: ${ColorPalette["gray-300"]};
        font-weight: 400;
      `;
    }}

    ${({ size }) => {
      switch (size) {
        case "large": {
          return css`
            height: 2.5rem;
            border-radius: 1.25rem;
            font-size: 16px;

            padding: 0 0.625rem;
          `;
        }
        default: {
          return css`
            height: 1.625rem;
            border-radius: 0.8125rem;
            font-size: 0.75rem;

            padding: 0 0.625rem;
          `;
        }
      }
    }}
    
    
    white-space: nowrap;

    // Remove normalized css properties.
    border-width: 0;
    border-style: none;
    border-image: none;
  `,
};
