import React, {
  FunctionComponent,
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SceneTransition,
  SceneTransitionRef,
  VerticalResizeTransition,
} from "../../../../components/transition";
import { Box } from "../../../../components/box";
import { YAxis } from "../../../../components/axis";
import { Body1 } from "../../../../components/typography";
import { useRegisterHeader } from "./context";
import { Gutter } from "../../../../components/gutter";
import { ColorPalette } from "../../../../styles";
import { RegisterH3 } from "../typography";
import { HelpDeskButton } from "../help-desk-button";

export const RegisterHeader: FunctionComponent<{
  sceneRef: MutableRefObject<SceneTransitionRef | null>;
}> = ({ sceneRef }) => {
  const headerSceneRef = useRef<SceneTransitionRef | null>(null);

  const { header } = useRegisterHeader();

  useEffect(() => {
    if (headerSceneRef.current) {
      switch (header.mode) {
        case "intro": {
          if (headerSceneRef.current.currentScene !== "intro") {
            headerSceneRef.current.replace("intro", {});
          }
          break;
        }
        case "empty": {
          if (headerSceneRef.current.currentScene !== "empty") {
            headerSceneRef.current.replace("empty", {});
          }
          break;
        }
        case "welcome": {
          if (headerSceneRef.current.currentScene !== "welcome") {
            headerSceneRef.current.replace("welcome", {
              title: header.title,
              paragraph: header.paragraph,
            });
          } else {
            headerSceneRef.current.setCurrentSceneProps({
              title: header.title,
              paragraph: header.paragraph,
            });
          }
          break;
        }
        case "step": {
          if (headerSceneRef.current.currentScene !== "step") {
            headerSceneRef.current.replace("step", {
              title: header.title,
              paragraphs: header.paragraphs,
              stepCurrent: header.stepCurrent,
              stepTotal: header.stepTotal,
            });
          } else {
            headerSceneRef.current.setCurrentSceneProps({
              title: header.title,
              paragraphs: header.paragraphs,
              stepCurrent: header.stepCurrent,
              stepTotal: header.stepTotal,
            });
          }
          break;
        }
        case "direct": {
          if (headerSceneRef.current.currentScene !== "direct") {
            headerSceneRef.current.replace("direct", {
              title: header.title,
              paragraphs: header.paragraphs,
            });
          } else {
            headerSceneRef.current.setCurrentSceneProps({
              title: header.title,
              paragraphs: header.paragraphs,
            });
          }
          break;
        }
      }
    }
  }, [header]);

  const [isBackShown, setIsBackShown] = useState(
    sceneRef.current?.canPop() ?? false
  );

  useEffect(() => {
    const listener = (stack: ReadonlyArray<string>) => {
      setIsBackShown(stack.length > 1);
    };

    const ref = sceneRef.current;
    ref?.addSceneChangeListener(listener);

    return () => {
      ref?.removeSceneChangeListener(listener);
    };
  }, [sceneRef]);

  const [currentIsEmpty, setCurrentIsEmpty] = useState(false);

  useEffect(() => {
    const listener = (stack: ReadonlyArray<string>) => {
      if (stack.length > 0 && stack[stack.length - 1] === "empty") {
        setCurrentIsEmpty(true);
      } else {
        setCurrentIsEmpty(false);
      }
    };

    const ref = headerSceneRef.current;
    ref?.addSceneChangeListener(listener);

    return () => {
      ref?.removeSceneChangeListener(listener);
    };
  }, []);

  return (
    <Box position="relative" marginX="auto" width="47.75rem">
      <HelpDeskButton />
      {isBackShown && !currentIsEmpty ? (
        <div
          style={{
            position: "fixed",
            cursor: "pointer",
            top: "10rem",
            left: "3.25rem",
            zIndex: 1000,
          }}
        >
          <BackButton sceneRef={sceneRef} />
        </div>
      ) : null}
      <SceneTransition
        ref={headerSceneRef}
        scenes={[
          {
            name: "intro",
            element: () => null,
          },
          {
            name: "empty",
            element: () => null,
          },
          {
            name: "welcome",
            element: () => null,
          },
          {
            name: "step",
            element: EmptyHeader,
          },
          {
            name: "direct",
            element: HeaderDirect,
          },
        ]}
        initialSceneProps={{
          name: header.mode,
        }}
        transitionAlign="center"
        transitionMode="opacity"
      />
      {
        <VerticalResizeTransition>
          {/* bottom padding */}
          {currentIsEmpty ? null : <Gutter size="2rem" />}
        </VerticalResizeTransition>
      }
    </Box>
  );
};

const EmptyHeader: FunctionComponent = () => {
  return (
    <Box
      style={{
        height: "8rem",
      }}
    />
  );
};

//
// const HeaderStep: FunctionComponent<{
//   title: string;
//   paragraphs?: (string | ReactNode)[];
//   stepCurrent: number;
//   stepTotal: number;
// }> = ({ title, paragraphs, stepCurrent, stepTotal }) => {
//   const intl = useIntl();
//   const theme = useTheme();
//   return (
//     <Box position="relative">
//       <YAxis alignX="center">
//         {stepCurrent <= 0 && stepTotal <= 0 ? null : (
//           <React.Fragment>
//             <Subtitle3
//               color={
//                 theme.mode === "light"
//                   ? ColorPalette["gray-300"]
//                   : ColorPalette["gray-200"]
//               }
//             >{`${intl.formatMessage({
//               id: "pages.register.components.header.header-step.title",
//             })} ${stepCurrent}/${stepTotal}`}</Subtitle3>
//             <Gutter size="0.75rem" />
//           </React.Fragment>
//         )}
//
//         <RegisterH3>{title}</RegisterH3>
//       </YAxis>
//       <Box width="29.5rem" marginX="auto">
//         <VerticalResizeTransition>
//           {paragraphs && paragraphs.length > 0 ? (
//             <Gutter size="1.25rem" />
//           ) : null}
//         </VerticalResizeTransition>
//         <VerticalResizeTransition transitionAlign="top">
//           {(() => {
//             if (paragraphs && paragraphs.length > 0) {
//               if (paragraphs.length === 1) {
//                 return (
//                   <Body1
//                     color={ColorPalette["gray-300"]}
//                     style={{
//                       textAlign: "center",
//                     }}
//                   >
//                     {paragraphs[0]}
//                   </Body1>
//                 );
//               }
//
//               return (
//                 <YAxis alignX="center">
//                   <ul>
//                     {paragraphs.map((paragraph, i) => {
//                       return (
//                         <Body1
//                           key={i}
//                           as="li"
//                           color={ColorPalette["gray-300"]}
//                           style={{ marginTop: i > 0 ? "0.5rem" : "0" }}
//                         >
//                           {paragraph}
//                         </Body1>
//                       );
//                     })}
//                   </ul>
//                 </YAxis>
//               );
//             }
//
//             return null;
//           })()}
//         </VerticalResizeTransition>
//       </Box>
//     </Box>
//   );
// };

const HeaderDirect: FunctionComponent<{
  title: string;
  paragraphs?: (string | ReactNode)[];
}> = ({ title, paragraphs }) => {
  return (
    <Box position="relative">
      <YAxis alignX="center">
        <RegisterH3>{title}</RegisterH3>
      </YAxis>
      <Box width="29.5rem" marginX="auto">
        <VerticalResizeTransition>
          {paragraphs && paragraphs.length > 0 ? (
            <Gutter size="1.25rem" />
          ) : null}
        </VerticalResizeTransition>
        <VerticalResizeTransition transitionAlign="top">
          {(() => {
            if (paragraphs && paragraphs.length > 0) {
              if (paragraphs.length === 1) {
                return (
                  <Body1
                    color={ColorPalette["gray-300"]}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {paragraphs[0]}
                  </Body1>
                );
              }

              return (
                <YAxis alignX="center">
                  <ul>
                    {paragraphs.map((paragraph, i) => {
                      return (
                        <Body1
                          key={i}
                          as="li"
                          color={ColorPalette["gray-300"]}
                          style={{ marginTop: i > 0 ? "0.5rem" : "0" }}
                        >
                          {paragraph}
                        </Body1>
                      );
                    })}
                  </ul>
                </YAxis>
              );
            }

            return null;
          })()}
        </VerticalResizeTransition>
      </Box>
    </Box>
  );
};

const BackButton: FunctionComponent<{
  sceneRef: MutableRefObject<SceneTransitionRef | null>;
}> = ({ sceneRef }) => {
  return (
    <div
      style={{
        cursor: "pointer",
      }}
      onClick={(e) => {
        e.preventDefault();

        if (sceneRef.current && sceneRef.current.stack.length > 1) {
          sceneRef.current.pop();
        }
      }}
    >
      <svg
        width="87"
        height="44"
        viewBox="0 0 87 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="87" height="44" rx="22" fill="#231F20" />
        <path
          d="M13.4697 21.4697C13.1768 21.7626 13.1768 22.2374 13.4697 22.5303L18.2426 27.3033C18.5355 27.5962 19.0104 27.5962 19.3033 27.3033C19.5962 27.0104 19.5962 26.5355 19.3033 26.2426L15.0607 22L19.3033 17.7574C19.5962 17.4645 19.5962 16.9896 19.3033 16.6967C19.0104 16.4038 18.5355 16.4038 18.2426 16.6967L13.4697 21.4697ZM27 21.25H14V22.75H27V21.25Z"
          fill="#BEBEBE"
        />
        <path
          d="M40.375 27H36.5234V16.0625H40.2812C42.2891 16.0625 43.3594 16.9766 43.3594 18.7031V18.7344C43.3594 20.0234 42.7109 20.8516 41.5078 21.0703V21.2266C42.9531 21.4453 43.7266 22.375 43.7266 23.8984V23.9375C43.7266 25.9297 42.5625 27 40.375 27ZM38.0703 17.2734V20.6484H40.0234C41.2344 20.6484 41.8203 20.1016 41.8203 18.9375V18.9062C41.8203 17.7969 41.2344 17.2734 40.0234 17.2734H38.0703ZM38.0703 21.7266V25.7812H40.0938C41.4453 25.7812 42.0938 25.1328 42.0938 23.7734V23.7344C42.0938 22.3828 41.4453 21.7266 40.0938 21.7266H38.0703ZM46.8438 27.1797C45.5547 27.1797 44.8203 26.4531 44.8203 25.1797V25.1484C44.8203 23.5078 46.1094 22.8203 47.7266 22.3906L49.3438 21.9531V21.2031C49.3438 20.1484 48.9141 19.6484 47.9531 19.6484C46.8438 19.6484 46.3359 20.3594 46.4453 21.7969L44.9844 21.5625C44.875 19.7109 45.9453 18.6172 47.9844 18.6172C49.8828 18.6172 50.8281 19.4922 50.8281 21.1562V25.2891C50.8281 25.9688 50.9141 26.0469 51.7109 26.0938L51.4688 27.1484C51.3828 27.1641 51.2344 27.1797 51.1016 27.1797C49.6797 27.1797 49.3984 26.5312 49.7734 24.9844L49.6172 24.9453C49.2188 26.3906 48.2656 27.1797 46.8438 27.1797ZM47.3516 26.0547C48.4922 26.0547 49.3438 25.0781 49.3438 23.6797V23.0078L48.2344 23.3281C47.125 23.6406 46.3438 24.125 46.3438 25.0312V25.0625C46.3438 25.6953 46.7188 26.0547 47.3516 26.0547ZM55.6719 27.1797C53.4844 27.1797 52.3281 25.6719 52.3281 22.8516V22.8203C52.3281 20.0781 53.5312 18.6172 55.6797 18.6172C57.5781 18.6172 58.625 19.6953 58.8125 21.6875L57.3125 21.9297C57.2109 20.3594 56.7109 19.6562 55.6641 19.6562C54.4609 19.6562 53.8906 20.6172 53.8906 22.6172V23.0547C53.8906 25.1328 54.4766 26.1328 55.6953 26.1328C56.7109 26.1328 57.2578 25.4219 57.3672 24.0312L58.9141 24.2734C58.6641 26.1484 57.5391 27.1797 55.6719 27.1797ZM62 27H60.4922V16.0625H62V19.8438C62 20.8281 61.9453 21.4766 61.7969 22.2656L61.9375 22.3281L64.625 18.7969H66.2734L63.9688 21.7109L66.3672 27H64.7969L62.9219 22.6875L62 23.8281V27Z"
          fill="#BEBEBE"
        />
      </svg>
    </div>
  );
};
