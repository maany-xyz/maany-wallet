import React, { FunctionComponent, PropsWithChildren } from "react";
import { GlobalSimpleBarProvider } from "./hooks/global-simplebar";
import { Link, useLocation } from "react-router-dom";
import { ColorPalette } from "./styles";
import { YAxis } from "./components/axis";
import { Caption3 } from "./components/typography";
import { Box } from "./components/box";

export const BottomTabsHeightRem = "4.25rem";

// XXX: Used to change the tab icon depending on the active state.
//      Using the Context API here seems overkill.
//      Originally, the design did not require icons to change based on the active state.
//      However, the design was later changed, and this functionality had to be added, so it was handled this way.
const BottomTabActiveStateContext = React.createContext<{
  isActive: boolean;
} | null>(null);

export const BottomTabsRouteProvider: FunctionComponent<
  PropsWithChildren<{
    isNotReady: boolean;

    tabs: {
      pathname: string;
      icon: React.ReactNode;
      text: string;
    }[];

    forceHideBottomTabs?: boolean;
  }>
> = ({ children, isNotReady, tabs, forceHideBottomTabs }) => {
  const location = useLocation();

  const shouldBottomTabsShown =
    !forceHideBottomTabs &&
    tabs.find((tab) => tab.pathname === location.pathname);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <GlobalSimpleBarProvider style={{ height: "100%" }}>
          {children}
        </GlobalSimpleBarProvider>
      </div>
      {shouldBottomTabsShown ? (
        <div
          style={{
            height: BottomTabsHeightRem,
            backgroundColor: ColorPalette["slate-bg-blur"],
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            backdropFilter: "blur(10px)",
            paddingBottom: "0.5rem",
            zIndex: 999999,
          }}
        >
          {tabs.map((tab, i) => {
            const isActive = tab.pathname === location.pathname;

            return (
              <Box
                key={i}
                style={{
                  // To ensure that all tabs are evenly distributed regardless of the text length,
                  // a trick is used by setting the width of the parent element to 1px.
                  width: "1px",
                }}
              >
                <Link
                  to={tab.pathname}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: isNotReady ? 0 : 1,
                      color: isActive
                        ? ColorPalette["yellow-300"]
                        : ColorPalette["white"],
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        minWidth: "2.875rem",
                        height: "100%",
                      }}
                    />
                    <YAxis alignX="center">
                      <BottomTabActiveStateContext.Provider
                        value={{
                          isActive,
                        }}
                      >
                        <Box>{tab.icon}</Box>
                        <Caption3
                          style={{
                            marginTop: "4px",
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                            wordBreak: "keep-all",
                          }}
                          color={
                            isActive
                              ? ColorPalette["yellow-300"]
                              : ColorPalette["white"]
                          }
                        >
                          {tab.text}
                        </Caption3>
                      </BottomTabActiveStateContext.Provider>
                    </YAxis>
                  </div>
                </Link>
              </Box>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export const BottomTabHomeIcon: FunctionComponent<{
  width: string;
  height: string;
}> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_17447_148)">
        <g clipPath="url(#clip1_17447_148)">
          <path
            d="M4.47717 20.4432C6.57447 20.4432 8.27466 18.74 8.27466 16.6391C8.27466 14.5381 6.57447 12.835 4.47717 12.835C2.37988 12.835 0.679688 14.5381 0.679688 16.6391C0.679688 18.74 2.37988 20.4432 4.47717 20.4432Z"
            fill="currentColor"
          />
          <path
            d="M6.84813 11.3945C8.69402 11.3945 10.1904 9.89545 10.1904 8.04635C10.1904 6.19724 8.69402 4.69824 6.84813 4.69824C5.00225 4.69824 3.50586 6.19724 3.50586 8.04635C3.50586 9.89545 5.00225 11.3945 6.84813 11.3945Z"
            fill="currentColor"
          />
          <path
            d="M11.1447 25.1838C12.8297 25.1838 14.1956 23.8155 14.1956 22.1275C14.1956 20.4396 12.8297 19.0713 11.1447 19.0713C9.4597 19.0713 8.09375 20.4396 8.09375 22.1275C8.09375 23.8155 9.4597 25.1838 11.1447 25.1838Z"
            fill="currentColor"
          />
          <path
            d="M13.7645 6.88776C15.3668 6.88776 16.6657 5.58658 16.6657 3.98148C16.6657 2.37638 15.3668 1.0752 13.7645 1.0752C12.1622 1.0752 10.8633 2.37638 10.8633 3.98148C10.8633 5.58658 12.1622 6.88776 13.7645 6.88776Z"
            fill="currentColor"
          />
          <path
            d="M18.5391 24.106C20.004 24.106 21.1915 22.9164 21.1915 21.449C21.1915 19.9816 20.004 18.792 18.5391 18.792C17.0742 18.792 15.8867 19.9816 15.8867 21.449C15.8867 22.9164 17.0742 24.106 18.5391 24.106Z"
            fill="currentColor"
          />
          <path
            d="M20.9731 5.8443C22.3195 5.8443 23.411 4.75091 23.411 3.40213C23.411 2.05336 22.3195 0.959961 20.9731 0.959961C19.6266 0.959961 18.5352 2.05336 18.5352 3.40213C18.5352 4.75091 19.6266 5.8443 20.9731 5.8443Z"
            fill="currentColor"
          />
          <path
            d="M24.0193 20.0296C25.2305 20.0296 26.2124 19.046 26.2124 17.8327C26.2124 16.6193 25.2305 15.6357 24.0193 15.6357C22.8081 15.6357 21.8262 16.6193 21.8262 17.8327C21.8262 19.046 22.8081 20.0296 24.0193 20.0296Z"
            fill="currentColor"
          />
          <path
            d="M27.0858 14.6226C28.1428 14.6226 28.9997 13.7642 28.9997 12.7053C28.9997 11.6465 28.1428 10.7881 27.0858 10.7881C26.0288 10.7881 25.1719 11.6465 25.1719 12.7053C25.1719 13.7642 26.0288 14.6226 27.0858 14.6226Z"
            fill="currentColor"
          />
          <path
            d="M25.9279 9.18785C27.0207 9.18785 27.9065 8.30043 27.9065 7.20574C27.9065 6.11105 27.0207 5.22363 25.9279 5.22363C24.8351 5.22363 23.9492 6.11105 23.9492 7.20574C23.9492 8.30043 24.8351 9.18785 25.9279 9.18785Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_17447_148">
          <rect
            width="28.3203"
            height="24.2271"
            fill="currentColor"
            transform="translate(0.679688 0.959961)"
          />
        </clipPath>
        <clipPath id="clip1_17447_148">
          <rect
            width="28.3203"
            height="24.2271"
            fill="currentColor"
            transform="translate(0.679688 0.959961)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const BottomTabSwapIcon: FunctionComponent<{
  width: string;
  height: string;
}> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.3882 23.2671C14.3882 23.8194 13.9405 24.2671 13.3882 24.2671H10.5298C9.9775 24.2671 9.52979 23.8194 9.52979 23.2671V15.7212C9.52979 15.1689 9.08207 14.7212 8.52979 14.7212H1.03272C0.48043 14.7212 0.0327148 14.2735 0.0327148 13.7212V11.0581C0.0327148 10.5058 0.48043 10.0581 1.03271 10.0581H8.52979C9.08207 10.0581 9.52979 9.61039 9.52979 9.05811V1.48779C9.52979 0.935508 9.9775 0.487793 10.5298 0.487793H13.3882C13.9405 0.487793 14.3882 0.935508 14.3882 1.48779V9.05811C14.3882 9.61039 14.8359 10.0581 15.3882 10.0581H22.8608C23.4131 10.0581 23.8608 10.5058 23.8608 11.0581V13.7212C23.8608 14.2735 23.4131 14.7212 22.8608 14.7212H15.3882C14.8359 14.7212 14.3882 15.1689 14.3882 15.7212V23.2671Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const BottomTabActivityIcon: FunctionComponent<{
  width: string;
  height: string;
}> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.7992 0.270141C20.1925 0.164884 20.4695 0.64685 20.1814 0.934922L13.6056 7.51072C12.2927 8.82366 10.4978 9.54384 8.63638 9.49399L5.79444 9.42197C5.50082 9.41643 5.26261 9.17821 5.25707 8.89014L5.23491 8.32508C5.22383 8.0647 5.03548 7.84311 4.78064 7.79879L1.00801 7.11739C0.442943 7.01767 0.387544 6.23102 0.930449 6.0482L19.7992 0.270141Z"
        fill="currentColor"
      />
      <path
        d="M15.7562 20.8892C15.5734 21.4321 14.7923 21.3767 14.687 20.8116L13.9834 16.9947C13.9336 16.7399 13.7175 16.546 13.4516 16.5404L12.9697 16.5293C12.676 16.5238 12.4378 16.2856 12.4323 15.992L12.3492 13.1611C12.2938 11.2886 13.0084 9.48266 14.3325 8.15864L20.875 1.61608C21.1631 1.32801 21.6451 1.605 21.5398 1.99833L15.7562 20.8837V20.8892Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const BottomTabSettingIcon: FunctionComponent<{
  width: string;
  height: string;
}> = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.9475 21.1908C21.2725 21.1908 21.5203 20.9099 21.4983 20.5905C21.267 17.1151 19.0749 14.3613 16.4258 14.3613H5.89518C3.24601 14.3613 1.05397 17.1096 0.822651 20.5905C0.800621 20.9154 1.04846 21.1908 1.37341 21.1908H20.9475Z"
        fill="currentColor"
      />
      <path
        d="M16.7075 3.49644C16.344 3.21005 15.8703 2.91263 15.281 2.69784C15.0497 2.60971 14.8239 2.54913 14.6036 2.49956C14.2676 2.42245 14.1519 1.99837 14.4273 1.78908C14.4273 1.78908 14.4383 1.78357 14.4438 1.77806C14.7192 1.56326 14.6036 1.11714 14.2566 1.06207C13.7719 0.979454 13.1551 0.951915 12.4666 1.07308C12.1967 1.12265 11.9434 1.18874 11.7176 1.26585C11.3926 1.376 11.0787 1.06758 11.1999 0.748133C11.2054 0.73161 11.2109 0.715087 11.2164 0.698564C11.3431 0.373613 11.0126 0.0541705 10.6821 0.186354C10.225 0.368106 9.68525 0.654503 9.15651 1.11714C8.78199 1.4421 8.66084 2.18563 8.27531 2.10852C7.99992 2.05344 8.17066 1.56877 8.13761 1.31542C8.09355 0.968438 7.65294 0.84727 7.42712 1.11714C7.11319 1.49717 6.77171 2.00387 6.52938 2.66479C6.44126 2.89611 6.38068 3.12192 6.33111 3.34223C6.254 3.6782 5.82991 3.79386 5.62062 3.51847C5.62062 3.51847 5.6151 3.50746 5.60959 3.50195C5.3948 3.22657 4.94869 3.34223 4.89361 3.68921C4.81099 4.17388 4.78345 4.79074 4.90462 5.47919C4.95419 5.74907 5.02028 6.00242 5.09739 6.22823C5.20754 6.55318 4.89911 6.86712 4.57967 6.74595C4.56315 6.74044 4.54663 6.73493 4.5301 6.72943C4.20515 6.60275 3.88571 6.93321 4.0179 7.26367C4.19965 7.7208 4.48605 8.26055 4.94869 8.78928C5.30118 9.19134 5.83541 9.21888 5.76381 9.59891C5.70873 9.87429 5.40031 9.76964 5.15247 9.80269C4.80549 9.84675 4.68433 10.2874 4.9542 10.5132C5.33423 10.8271 5.84093 11.1686 6.50185 11.4109C7.05261 11.6147 7.56482 11.6973 7.99441 11.7249C8.84809 12.3968 9.92208 12.8044 11.0897 12.8044H11.2109C13.9757 12.8044 16.2393 10.5407 16.2393 7.77588V7.73732C16.2393 6.62478 15.8703 5.60036 15.2535 4.7632C15.5894 4.44926 16.0576 4.28404 16.4982 4.21794C16.8507 4.16838 16.9939 3.72226 16.713 3.50195L16.7075 3.49644Z"
        fill="currentColor"
      />
    </svg>
  );
};
