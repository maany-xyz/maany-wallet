import styled from "styled-components";

type BaseTypographyProps = {
  color?: string;
};

export const BaseHafferTypography = styled.div<BaseTypographyProps>`
  font-family: "Maany";

  color: ${({ color }) => (color ? color : "inherit")};
`;
