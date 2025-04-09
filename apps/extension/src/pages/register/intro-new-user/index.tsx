import React, { FunctionComponent } from "react";
import { RegisterSceneBox } from "../components/register-scene-box";
import { Stack } from "../../../components/stack";
import { Button } from "../../../components/button";
import {
  useSceneEvents,
  useSceneTransition,
} from "../../../components/transition";
import { Column, Columns } from "../../../components/column";
import { Box } from "../../../components/box";
import { ColorPalette } from "../../../styles";
import { Subtitle3 } from "../../../components/typography";
import { Gutter } from "../../../components/gutter";
import { useRegisterHeader } from "../components/header";
import { RegisterH4 } from "../components/typography";
import * as KeplrWalletPrivate from "keplr-wallet-private";
import { FormattedMessage, useIntl } from "react-intl";
import { useTheme } from "styled-components";

export const RegisterIntroNewUserScene: FunctionComponent = () => {
  const sceneTransition = useSceneTransition();
  const intl = useIntl();
  const theme = useTheme();

  const header = useRegisterHeader();
  useSceneEvents({
    onWillVisible: () => {
      header.setHeader({
        mode: "welcome",
        title: intl.formatMessage({
          id: "pages.register.intro-new-user.title",
        }),
        paragraph: intl.formatMessage({
          id: "pages.register.intro-new-user.paragraph",
        }),
      });
    },
  });

  return (
    <RegisterSceneBox>
      <Columns sum={2} gutter="2.5rem">
        <Column weight={1}>
          <Box minHeight="15.625rem">
            <RegisterH4
              color={
                theme.mode === "light"
                  ? ColorPalette["gray-400"]
                  : ColorPalette["gray-50"]
              }
            >
              <FormattedMessage id="pages.register.intro-new-user.recovery-path-title" />
            </RegisterH4>

            <Gutter size="0.5rem" />

            <Subtitle3 color={ColorPalette["white"]}>
              <FormattedMessage id="pages.register.intro-new-user.recovery-path-paragraph" />
            </Subtitle3>

            <Gutter size="1.5rem" />

            <Stack gutter="1rem">
              <Button
                text={intl.formatMessage({
                  id: "pages.register.intro-new-user.new-recovery-path-button",
                })}
                size="large"
                onClick={() => {
                  sceneTransition.push("new-mnemonic");
                }}
              />
              <Button
                text={intl.formatMessage({
                  id: "pages.register.intro-new-user.import-recovery-path-button",
                })}
                size="large"
                color={"secondary"}
                onClick={() => {
                  sceneTransition.replace("existing-user");
                }}
              />
            </Stack>
          </Box>
        </Column>
        <Box
          width="1px"
          backgroundColor={
            theme.mode === "light"
              ? ColorPalette["gray-100"]
              : ColorPalette["gray-400"]
          }
        />
        <Column weight={1}>
          <Box height="100%">
            <RegisterH4
              color={
                theme.mode === "light"
                  ? ColorPalette["gray-400"]
                  : ColorPalette["gray-50"]
              }
            >
              <FormattedMessage id="pages.register.intro-new-user.sign-up-social-title" />
            </RegisterH4>
            <Gutter size="0.5rem" />
            <Subtitle3 color={ColorPalette["white"]}>
              <FormattedMessage id="pages.register.intro-new-user.sign-up-social-paragraph" />
            </Subtitle3>
            <Gutter size="1.5rem" />

            <Stack gutter="0.625rem">
              <Button
                text={intl.formatMessage({
                  id: "pages.register.intro-new-user.sign-up-google-button",
                })}
                size="large"
                color="secondary"
                onClick={() => {
                  if (KeplrWalletPrivate.onGoogleSignInClick) {
                    KeplrWalletPrivate.onGoogleSignInClick(sceneTransition);
                  } else {
                    alert(
                      intl.formatMessage({ id: "error.not-supported-error" })
                    );
                  }
                }}
              />
            </Stack>
          </Box>
        </Column>
      </Columns>
    </RegisterSceneBox>
  );
};
