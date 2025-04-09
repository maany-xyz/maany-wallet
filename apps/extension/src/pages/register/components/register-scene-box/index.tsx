import React, { FunctionComponent, PropsWithChildren } from "react";
import { Box } from "../../../../components/box";
import styled from "styled-components";
import { ColorPalette } from "../../../../styles";

export const RegisterSceneBox: FunctionComponent<
  PropsWithChildren<{
    style?: React.CSSProperties;
    paddingX?: string;
    paddingY?: string;
  }>
> = ({ children, paddingX = "3.25rem", paddingY = "3rem", style }) => {
  return (
    <Box paddingX={paddingX} paddingY={paddingY} style={style}>
      {children}
    </Box>
  );
};

const Styles = {
  RegisterSceneBoxHeader: styled.div`
    font-weight: 600;
    font-size: 2rem;
    line-height: 2rem;
    text-align: center;
    color: ${ColorPalette["platinum-500"]};

    margin-bottom: 2rem;
  `,
};

export const RegisterSceneBoxHeader: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Styles.RegisterSceneBoxHeader>{children}</Styles.RegisterSceneBoxHeader>
  );
};
