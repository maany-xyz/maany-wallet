import React, { FunctionComponent } from "react";
import { RegisterSceneBox } from "../components/register-scene-box";
import { Stack } from "../../../components/stack";
import { Button } from "../../../components/button";
import { useSceneEvents } from "../../../components/transition";
import { useRegisterHeader } from "../components/header";
import { YAxis } from "../../../components/axis";
import { Gutter } from "../../../components/gutter";
import { observer } from "mobx-react-lite";
import { FormattedMessage, useIntl } from "react-intl";
import { Logo } from "../components/logo/logo";
import { Subtitle2 } from "../../../components/typography";
import { ColorPalette } from "../../../styles";
import { Box } from "../../../components/box";

export const WelcomeToMaany: FunctionComponent = observer(() => {
  const intl = useIntl();

  const header = useRegisterHeader();
  useSceneEvents({
    onWillVisible: () => {
      header.setHeader({
        mode: "intro",
      });
    },
  });

  return (
    <RegisterSceneBox>
      <YAxis alignX="center">
        <Logo fill={ColorPalette["yellow-400"]} />
      </YAxis>
      <Gutter size="3.125rem" />
      <Box style={{ fontWeight: 600, fontSize: "64px", textAlign: "center" }}>
        <FormattedMessage id="ACCOUNT CREATED" />
      </Box>
      <Subtitle2
        color={ColorPalette["white"]}
        style={{ textAlign: "center", marginBottom: 20, marginTop: 20 }}
      >
        <FormattedMessage
          id="Click the Extensions button now to access your wallet.
For more questions or contact options go here."
        />
      </Subtitle2>
      <Stack gutter="1.25rem">
        <Button
          text={intl.formatMessage({
            id: "pages.register.pages.welcome.finish-button",
          })}
          size="large"
          onClick={() => {
            window.close();
          }}
        />
      </Stack>
    </RegisterSceneBox>
  );
});
