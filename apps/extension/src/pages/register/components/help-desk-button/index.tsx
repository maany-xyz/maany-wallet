import React, { FunctionComponent } from "react";
import { Columns } from "../../../../components/column";
import { Subtitle1 } from "../../../../components/typography";
import { ColorPalette } from "../../../../styles";
import styled from "styled-components";
import { HelpDeskUrl } from "../../../../config.ui";
import { FormattedMessage } from "react-intl";
import { HeaderLogo } from "../logo/header-logo";

const Container = styled.div`
  position: fixed;
  top: 2.75rem;
  right: 3.25rem;
  left: 3.25rem;
  background-color: ${ColorPalette["secondary-background"]};
  border-radius: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 13px 40px;
  z-index: 1000;
`;

const Styles = {
  Title: styled(Subtitle1)`
    color: ${ColorPalette["gray-200"]};
    font-weight: 500;

    ${Container}:hover & {
      color: ${ColorPalette["gray-100"]};
    }
  `,
};

export const HelpDeskButton: FunctionComponent = () => {
  return (
    <a href={HelpDeskUrl} target="_blank" rel="noreferrer">
      <Container>
        <HeaderLogo />

        <Columns sum={1} gutter="0.5rem" alignY="center">
          <Styles.Title>
            <FormattedMessage id="pages.register.components.help-desk-button.title" />
          </Styles.Title>
        </Columns>
      </Container>
    </a>
  );
};
