import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { ISenderConfig } from "@keplr-wallet/hooks";
import { useStore } from "../../../../stores";
import { Box } from "../../../../components/box";
import { XAxis } from "../../../../components/axis";
import { Gutter } from "../../../../components/gutter";
import {
  H3,
  Subtitle1,
  Subtitle2,
  Subtitle3,
} from "../../../../components/typography";
import styled, { useTheme } from "styled-components";
import { ColorPalette } from "../../../../styles";
import {
  ChainImageFallback,
  CurrencyImageFallback,
  RawImageFallback,
} from "../../../../components/image";
import { AppCurrency } from "@keplr-wallet/types";
import { IBCSwapAmountConfig } from "@keplr-wallet/hooks-internal";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { LoadingIcon } from "../../../../components/icon";
import { CoinPretty, Dec, DecUtils } from "@keplr-wallet/unit";
import { useEffectOnce } from "../../../../hooks/use-effect-once";
import { VerticalCollapseTransition } from "../../../../components/transition/vertical-collapse";
import { Modal } from "../../../../components/modal";
import SimpleBar from "simplebar-react";
import { SearchTextInput } from "../../../../components/input";
import { useFocusOnMount } from "../../../../hooks/use-focus-on-mount";
import { FormattedMessage, useIntl } from "react-intl";
import Text, { fontVariants } from "../../../../components/typography/text";

const Styles = {
  TextInput: styled.input`
    font-weight: 500;
    font-size: 32px;

    width: 100%;

    background: none;
    margin: 0;
    padding: 0;
    border: 0;

    color: ${() => ColorPalette["gray-700"]};

    ::placeholder {
      color: ${() => ColorPalette["gray-700"]};
    }

    // Remove normalized css properties
    outline: none;

    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `,
};

export const SwapAssetInfo: FunctionComponent<{
  type: "from" | "to";

  senderConfig: ISenderConfig;
  amountConfig: IBCSwapAmountConfig;

  onDestinationChainSelect?: (
    chainId: string,
    coinMinimalDenom: string
  ) => void;
}> = observer(({ type, amountConfig, onDestinationChainSelect }) => {
  const { chainStore, priceStore } = useStore();

  const theme = useTheme();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const price = (() => {
    return priceStore.calculatePrice(amountConfig.amount[0]);
  })();
  const [priceValue, setPriceValue] = useState("");
  const [isPriceBased, setIsPriceBased] = useState(false);

  // Price symbol의 collapsed transition을 기다리기 위해서 사용됨.
  const [renderPriceSymbol, setRenderPriceSymbol] = useState(isPriceBased);
  useEffect(() => {
    if (isPriceBased) {
      setRenderPriceSymbol(true);
    }
  }, [isPriceBased]);

  const fromChainInfo = chainStore.getChain(amountConfig.chainId);
  const fromCurrency: AppCurrency | undefined = (() => {
    if (amountConfig.amount.length === 0) {
      return;
    }

    return amountConfig.amount[0].currency;
  })();

  const toChainInfo = chainStore.getChain(amountConfig.outChainId);
  const outCurrency: AppCurrency = amountConfig.outCurrency;

  const textInputRef = useRef<HTMLInputElement | null>(null);
  useEffectOnce(() => {
    if (type === "from") {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }
  });

  const [isSelectDestinationModalOpen, setIsSelectDestinationModalOpen] =
    useState(false);

  const intl = useIntl();
  const isFrom = type === "from";
  return (
    <Box
      paddingX="1rem"
      paddingBottom={isFrom ? "0.75rem" : "2rem"}
      paddingTop={isFrom ? "2rem" : "1rem"}
      backgroundColor={ColorPalette["gray-200"]}
      style={{
        borderTopLeftRadius: isFrom ? "30px" : "0",
        borderTopRightRadius: isFrom ? "30px" : "0",
        borderBottomLeftRadius: isFrom ? "0" : "30px",
        borderBottomRightRadius: isFrom ? "0" : "30px",
      }}
    >
      <XAxis alignY="center">
        <Gutter size="0.25rem" />
        <Subtitle3 color={ColorPalette["gray-950"]}>
          {type === "from"
            ? intl.formatMessage({
                id: "page.ibc-swap.components.swap-asset-info.from",
              })
            : intl.formatMessage({
                id: "page.ibc-swap.components.swap-asset-info.to",
              })}
        </Subtitle3>

        {(() => {
          if (type === "to") {
            if (amountConfig.isFetching) {
              /* 로딩 아이콘이 부모의 height에 영향을 끼치지 않게 하기 위한 트릭 구조임 */
              return (
                <Box
                  height="1px"
                  alignX="center"
                  alignY="center"
                  marginLeft="0.25rem"
                >
                  <Box width="1rem" height="1rem">
                    <LoadingIcon
                      width="1rem"
                      height="1rem"
                      color={ColorPalette["gray-950"]}
                    />
                  </Box>
                </Box>
              );
            }
          }
        })()}
        <div
          style={{
            flex: 1,
          }}
        />
      </XAxis>

      <Gutter size="0.75rem" />

      <XAxis alignY="center">
        <Gutter size="0.25rem" />
        {renderPriceSymbol ? (
          <PriceSymbol
            show={isPriceBased}
            onTransitionEnd={() => {
              if (!isPriceBased) {
                setRenderPriceSymbol(false);
              }
            }}
          />
        ) : null}
        <Styles.TextInput
          ref={textInputRef}
          value={
            type === "from"
              ? (() => {
                  if (isPriceBased) {
                    if (amountConfig.fraction != 0) {
                      return price
                        ?.toDec()
                        .toString(price?.options.maxDecimals);
                    }
                    return priceValue;
                  } else {
                    return amountConfig.value;
                  }
                })()
              : amountConfig.outAmount
                  .maxDecimals(6)
                  .trim(true)
                  .shrink(true)
                  .inequalitySymbol(true)
                  .hideDenom(true)
                  .toString()
          }
          placeholder="0"
          type={type === "from" ? "number" : undefined}
          onChange={(e) => {
            e.preventDefault();

            if (type === "from") {
              if (isPriceBased) {
                if (price) {
                  let value = e.target.value;
                  if (value.startsWith(".")) {
                    value = "0" + value;
                  }
                  if (value.trim().length === 0) {
                    amountConfig.setValue("");
                    setPriceValue(value);
                    return;
                  }
                  if (/^\d+(\.\d+)*$/.test(value)) {
                    let dec: Dec;
                    try {
                      dec = new Dec(value);
                    } catch (e) {
                      console.log(e);
                      return;
                    }
                    if (dec.lte(new Dec(0))) {
                      setPriceValue(value);
                      return;
                    }

                    const onePrice = priceStore.calculatePrice(
                      new CoinPretty(
                        amountConfig.amount[0].currency,
                        DecUtils.getTenExponentN(
                          amountConfig.amount[0].currency.coinDecimals
                        )
                      )
                    );

                    if (!onePrice) {
                      // Can't be happen
                      return;
                    }
                    const onePriceDec = onePrice.toDec();
                    const expectedAmount = dec.quo(onePriceDec);

                    setPriceValue(value);
                    amountConfig.setValue(
                      expectedAmount.toString(
                        amountConfig.amount[0].currency.coinDecimals
                      )
                    );
                  }
                }
              } else {
                amountConfig.setValue(e.target.value);
              }
            }
          }}
          autoComplete="off"
          readOnly={type !== "from"}
        />
        <Gutter size="0.5rem" />
        <Box
          paddingLeft="0.62rem"
          paddingRight="0.75rem"
          height="52px"
          alignY="center"
          borderRadius="99999999px"
          backgroundColor={ColorPalette["gray-950"]}
          hover={{
            backgroundColor: ColorPalette["gray-700"],
          }}
          cursor="pointer"
          onClick={(e) => {
            e.preventDefault();

            if (type === "from") {
              const outChainId = searchParams.get("outChainId");
              const outCoinMinimalDenom = searchParams.get(
                "outCoinMinimalDenom"
              );
              // from에 대한 currency를 선택하고 나면 이미 input 값의 의미(?) 자체가 크게 변했기 때문에
              // 다른 state는 유지할 필요가 없다. query string을 단순하게 to에 대한 currency만 유지한다.
              navigate(
                `/send/select-asset?isIBCSwap=true&navigateReplace=true&navigateTo=${encodeURIComponent(
                  `/ibc-swap?chainId={chainId}&coinMinimalDenom={coinMinimalDenom}${(() => {
                    let q = "";
                    if (outChainId) {
                      q += `outChainId=${outChainId}`;
                    }
                    if (outCoinMinimalDenom) {
                      if (q.length > 0) {
                        q += "&";
                      }
                      q += `outCoinMinimalDenom=${outCoinMinimalDenom}`;
                    }
                    if (q.length > 0) {
                      q = `&${q}`;
                    }
                    return q;
                  })()}`
                )}`
              );
            } else {
              // to에 대한 currency를 선택할 때 from에서 선택한 currency와 다른 state들은 여전히 유지시켜야한다.
              // 그러므로 query string을 최대한 유지한다.
              const qs = Object.fromEntries(searchParams.entries());
              delete qs["outChainId"];
              delete qs["outCoinMinimalDenom"];
              navigate(
                `/ibc-swap/select-destination?${(() => {
                  if (amountConfig.amount.length === 1) {
                    return `excludeKey=${encodeURIComponent(
                      `${amountConfig.chainInfo.chainIdentifier}/${amountConfig.amount[0].currency.coinMinimalDenom}`
                    )}&`;
                  }

                  return "";
                })()}navigateReplace=true&navigateTo=${encodeURIComponent(
                  `/ibc-swap?outChainId={chainId}&outCoinMinimalDenom={coinMinimalDenom}${(() => {
                    let q = "";
                    for (const [key, value] of Object.entries(qs)) {
                      q += `&${key}=${value}`;
                    }
                    return q;
                  })()}`
                )}`
              );
            }
          }}
        >
          <XAxis alignY="center">
            {(() => {
              const currency = type === "from" ? fromCurrency : outCurrency;

              if (type === "to") {
                if (
                  chainStore
                    .getChain(amountConfig.outChainId)
                    .findCurrency(outCurrency.coinMinimalDenom) == null
                ) {
                  return (
                    <LoadingIcon
                      width="1rem"
                      height="1rem"
                      color={ColorPalette["gray-200"]}
                    />
                  );
                }
              }

              return (
                <React.Fragment>
                  {/* Currency가 없을 경우엔 대충 fallback 이미지로 처리한다 */}
                  {!currency ? (
                    <RawImageFallback
                      src={undefined}
                      alt="empty"
                      size="36.7px"
                    />
                  ) : (
                    <CurrencyImageFallback
                      chainInfo={type === "from" ? fromChainInfo : toChainInfo}
                      currency={currency}
                      size="36.7px"
                    />
                  )}
                  <Gutter size="0.5rem" />
                  <Subtitle2
                    color={
                      theme.mode === "light"
                        ? ColorPalette["gray-600"]
                        : ColorPalette["gray-10"]
                    }
                  >
                    {(() => {
                      if (currency) {
                        if (
                          "originCurrency" in currency &&
                          currency.originCurrency
                        ) {
                          // XXX: 솔직히 이거 왜 타입 추론 제대로 안되는지 모르겠다... 일단 대충 처리
                          return (currency.originCurrency as any).coinDenom;
                        }

                        return currency.coinDenom;
                      }
                      return "Unknown";
                    })()}
                  </Subtitle2>
                  <Gutter size="0.25rem" />
                  <AllowLowIcon
                    width="1rem"
                    height="1rem"
                    color={
                      theme.mode === "light"
                        ? ColorPalette["gray-500"]
                        : ColorPalette["gray-200"]
                    }
                  />
                </React.Fragment>
              );
            })()}
          </XAxis>
        </Box>
      </XAxis>

      <Gutter size="0.4rem" />

      <XAxis alignY="center">
        {(() => {
          if (type === "from" && !price) {
            return null;
          }
          if (type === "to") {
            if (!priceStore.calculatePrice(amountConfig.outAmount)) {
              return null;
            }
          }

          return (
            <Box
              cursor={type === "from" ? "pointer" : undefined}
              onClick={(e) => {
                e.preventDefault();

                if (type !== "from") {
                  return;
                }

                if (!isPriceBased) {
                  if (price!.toDec().lte(new Dec(0))) {
                    setPriceValue("");
                  } else {
                    setPriceValue(
                      price!
                        .toDec()
                        .toString(price!.options.maxDecimals)
                        .toString()
                    );
                  }
                }
                setIsPriceBased(!isPriceBased);

                textInputRef.current?.focus();
              }}
            >
              <XAxis alignY="center">
                {type === "from" ? (
                  <React.Fragment>
                    <SwitchPriceBaseIcon
                      width="1.25rem"
                      height="1.25rem"
                      color={ColorPalette["gray-950"]}
                    />
                    <Gutter size="0.15rem" />
                  </React.Fragment>
                ) : null}
                <Text
                  fontVariant={fontVariants.MBodyM}
                  color={ColorPalette["gray-950"]}
                >
                  {(() => {
                    if (isPriceBased) {
                      return amountConfig.amount[0]
                        .trim(true)
                        .maxDecimals(6)
                        .inequalitySymbol(true)
                        .shrink(true)
                        .hideIBCMetadata(true)
                        .toString();
                    } else {
                      if (type === "from") {
                        return price!.toString();
                      } else {
                        const p = priceStore.calculatePrice(
                          amountConfig.outAmount
                        );
                        if (!p) {
                          return null;
                        }
                        return p.toString();
                      }
                    }
                  })()}
                </Text>
              </XAxis>
            </Box>
          );
        })()}
        <div
          style={{
            flex: 1,
          }}
        />
        <Gutter size="0.25rem" />
      </XAxis>

      <Modal
        isOpen={isSelectDestinationModalOpen}
        close={() => setIsSelectDestinationModalOpen(false)}
        align="bottom"
      >
        <SelectDestinationChainModal
          amountConfig={amountConfig}
          close={() => setIsSelectDestinationModalOpen(false)}
          onDestinationChainSelect={
            onDestinationChainSelect ||
            (() => {
              // noop
            })
          }
        />
      </Modal>
    </Box>
  );
});

const PriceSymbol: FunctionComponent<{
  show: boolean;
  onTransitionEnd: () => void;
}> = observer(({ show, onTransitionEnd }) => {
  const { priceStore } = useStore();
  const theme = useTheme();

  // VerticalCollapseTransition의 문제때메... 초기에는 transition이 안되는 문제가 있어서
  // 초기에는 transition을 하지 않도록 해야함.
  const [hasInit, setHasInit] = useState(false);

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (hasInit) {
      setCollapsed(!show);
    }
  }, [hasInit, show]);

  const fiatCurrency = priceStore.getFiatCurrency(priceStore.defaultVsCurrency);

  if (!fiatCurrency) {
    return null;
  }

  // VerticalCollapseTransition는 부모 컴포넌트로부터 width가 결정되어야만 작동 할 수 있기 때문에
  // 부모의 width를 결정하기 위해서 opacity: 0인 mock text를 넣어야 함.
  return (
    <Box position="relative" alignY="center" marginRight="0.35rem">
      <H3
        color={ColorPalette["gray-950"]}
        style={{
          opacity: 0,
        }}
      >
        {fiatCurrency.symbol}
      </H3>
      <Box position="absolute" width="100%">
        <VerticalCollapseTransition
          transitionAlign="center"
          collapsed={collapsed}
          onResize={() => {
            setHasInit(true);
          }}
          onTransitionEnd={onTransitionEnd}
        >
          <H3
            color={
              theme.mode === "light"
                ? ColorPalette["gray-700"]
                : ColorPalette.white
            }
          >
            {fiatCurrency.symbol}
          </H3>
        </VerticalCollapseTransition>
      </Box>
    </Box>
  );
});

const SelectDestinationChainModal: FunctionComponent<{
  close: () => void;
  amountConfig: IBCSwapAmountConfig;
  onDestinationChainSelect: (chainId: string, coinMinimalDenom: string) => void;
}> = observer(({ close, amountConfig, onDestinationChainSelect }) => {
  const { chainStore, skipQueriesStore } = useStore();

  const theme = useTheme();

  const searchRef = useFocusOnMount<HTMLInputElement>();
  const [search, setSearch] = useState("");

  const channels: {
    chainId: string;
    denom: string;
  }[] =
    skipQueriesStore.queryIBCSwap.getSwapDestinationCurrencyAlternativeChains(
      chainStore.getChain(amountConfig.outChainId),
      amountConfig.outCurrency
    );

  const filteredChannels = (() => {
    const trim = search.trim().toLowerCase();
    if (trim.length === 0) {
      return channels;
    }

    return channels.filter((channel) => {
      return chainStore
        .getChain(channel.chainId)
        .chainName.toLowerCase()
        .includes(trim);
    });
  })();

  const intl = useIntl();

  return (
    <Box
      backgroundColor={
        theme.mode === "light" ? ColorPalette.white : ColorPalette["gray-600"]
      }
      paddingTop="1.25rem"
    >
      <XAxis>
        <Gutter size="1.25rem" />
        <Subtitle1
          color={
            theme.mode === "light"
              ? ColorPalette["gray-700"]
              : ColorPalette.white
          }
        >
          <FormattedMessage id="page.ibc-swap.components.swap-asset-info.modal.select-destination-chain.title" />
        </Subtitle1>
      </XAxis>

      <Gutter size="0.75rem" />
      <Box paddingX="0.75rem">
        <SearchTextInput
          ref={searchRef}
          placeholder={intl.formatMessage({
            id: "page.ibc-swap.components.swap-asset-info.modal.search.placeholder",
          })}
          value={search}
          onChange={(e) => {
            e.preventDefault();

            setSearch(e.target.value);
          }}
        />
      </Box>
      <Gutter size="0.75rem" />

      <SimpleBar
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          height: "21.5rem",
        }}
      >
        {filteredChannels.map((channel) => {
          return (
            <Box key={channel.chainId + "/" + channel.denom} paddingX="0.75rem">
              <Box
                cursor="pointer"
                paddingX="1rem"
                paddingY="0.9rem"
                borderRadius="0.375rem"
                backgroundColor={
                  theme.mode === "light"
                    ? ColorPalette.white
                    : ColorPalette["gray-600"]
                }
                hover={{
                  backgroundColor:
                    theme.mode === "light"
                      ? ColorPalette["gray-10"]
                      : ColorPalette["gray-550"],
                }}
                onClick={(e) => {
                  e.preventDefault();

                  // View의 구조상 밑의 방식으로 처리가 불가능하다.
                  // parent에서 query string을 통해서 처리한다.
                  // amountConfig.setOutChainId(channel.destinationChainId);
                  // amountConfig.setOutCurrency(
                  //   chainStore
                  //     .getChain(channel.destinationChainId)
                  //     .forceFindCurrency(channel.denom)
                  // );
                  onDestinationChainSelect(channel.chainId, channel.denom);

                  close();
                }}
              >
                <XAxis alignY="center">
                  <ChainImageFallback
                    chainInfo={chainStore.getChain(channel.chainId)}
                    size="2rem"
                  />
                  <Gutter size="0.75rem" />
                  <Subtitle2
                    color={
                      theme.mode === "light"
                        ? ColorPalette["gray-700"]
                        : ColorPalette["gray-10"]
                    }
                  >
                    {chainStore.getChain(channel.chainId).chainName}
                  </Subtitle2>
                </XAxis>
              </Box>
            </Box>
          );
        })}
        <Gutter size="0.75rem" />
      </SimpleBar>
    </Box>
  );
});

const AllowLowIcon: FunctionComponent<{
  width: string;
  height: string;
  color: string;
}> = ({ width, height, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      stroke="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={color || "currentColor"}
        d="M8.632 11.188a.8.8 0 01-1.263 0L3.404 6.091A.8.8 0 014.036 4.8h7.928a.8.8 0 01.632 1.291l-3.964 5.097z"
      />
    </svg>
  );
};

const SwitchPriceBaseIcon: FunctionComponent<{
  width: string;
  height: string;
  color: string;
}> = ({ width, height, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      stroke="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color || "currentColor"}
        fillRule="evenodd"
        d="M12.743 3.348a.643.643 0 00.034.909l1.8 1.672H7.215a.643.643 0 000 1.285h7.362l-1.8 1.672a.643.643 0 10.875.942l3-2.785a.643.643 0 000-.942l-3-2.786a.643.643 0 00-.909.033zm-5.486 6.858a.643.643 0 00-.909-.034l-3 2.786a.643.643 0 000 .942l3 2.786a.643.643 0 00.875-.943l-1.8-1.671h7.363a.643.643 0 100-1.286H5.423l1.8-1.672a.643.643 0 00.034-.908z"
        clipRule="evenodd"
      />
    </svg>
  );
};
