import React, { FunctionComponent, useMemo, useState } from "react";
import { CollapsibleList } from "../../components/collapsible-list";
import {
  LookingForChains,
  TokenFoundModal,
  TokenItem,
  TokenTitleView,
} from "./components";
import { CoinPretty, Dec } from "@keplr-wallet/unit";
import { ViewToken } from "./index";
import { observer } from "mobx-react-lite";
import { Stack } from "../../components/stack";
import { useStore } from "../../stores";
import { Styles, TextButton } from "../../components/button-text";
import { Box } from "../../components/box";
import { Modal } from "../../components/modal";
import { ChainIdHelper } from "@keplr-wallet/cosmos";
import { Gutter } from "../../components/gutter";
import { EmptyView } from "../../components/empty-view";
import { Subtitle3 } from "../../components/typography";
import { YAxis } from "../../components/axis";
import { Checkbox } from "../../components/checkbox";
import { Caption2 } from "../../components/typography";
import { ColorPalette } from "../../styles";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import { DenomHelper } from "@keplr-wallet/common";
import { TokenDetailModal } from "./token-detail";
import { useSearchParams } from "react-router-dom";
import { ChainInfo, ModularChainInfo } from "@keplr-wallet/types";
import { useGetSearchChains } from "../../hooks/use-get-search-chains";

const NewTokenFoundButton = styled(TextButton)`
  ${Styles.Button} {
    color: ${(props) =>
      props.theme.mode === "light"
        ? ColorPalette["blue-400"]
        : ColorPalette["gray-50"]};

    :hover {
      color: ${(props) =>
        props.theme.mode === "light"
          ? ColorPalette["blue-500"]
          : ColorPalette["gray-200"]};
    }
  }
`;

export const AvailableTabView: FunctionComponent<{
  search: string;
  isNotReady?: boolean;

  // When the "Get Started" button is clicked in the alternative view for new users,
  // the copy address modal should be displayed.
  // Since the components are separated, using the context API for this would be cumbersome,
  // so it is handled roughly with a prop.
  onClickGetStarted?: () => void;
  onMoreTokensClosed: () => void;
}> = observer(({ search, isNotReady, onMoreTokensClosed }) => {
  const { hugeQueriesStore, chainStore, accountStore, uiConfigStore } =
    useStore();
  const intl = useIntl();

  const { trimSearch, searchedChainInfos } = useGetSearchChains({
    search,
    searchOption: "all",
    filterOption: "chainNameAndToken",
    minSearchLength: 3,
    clearResultsOnEmptyQuery: true,
  });

  const allBalances = hugeQueriesStore.getAllBalances(true);

  const _allBalancesSearchFiltered = useMemo(() => {
    return allBalances.filter((token) => {
      return (
        token.chainInfo.chainName.toLowerCase().includes(trimSearch) ||
        token.token.currency.coinDenom.toLowerCase().includes(trimSearch)
      );
    });
  }, [allBalances, trimSearch]);

  const hasLowBalanceTokens =
    hugeQueriesStore.filterLowBalanceTokens(allBalances).length > 0;
  const lowBalanceFilteredAllBalancesSearchFiltered =
    hugeQueriesStore.filterLowBalanceTokens(_allBalancesSearchFiltered);
  const allBalancesSearchFiltered =
    uiConfigStore.isHideLowBalance && hasLowBalanceTokens
      ? lowBalanceFilteredAllBalancesSearchFiltered
      : _allBalancesSearchFiltered;

  const lookingForChains = useMemo(() => {
    let disabledChainInfos: (ChainInfo | ModularChainInfo)[] =
      searchedChainInfos.filter(
        (chainInfo) => !chainStore.isEnabledChain(chainInfo.chainId)
      );

    const disabledStarknetChainInfos = chainStore.modularChainInfos.filter(
      (modularChainInfo) =>
        "starknet" in modularChainInfo &&
        !chainStore.isEnabledChain(modularChainInfo.chainId) &&
        trimSearch.length >= 3 &&
        (modularChainInfo.chainId.toLowerCase().includes(trimSearch) ||
          modularChainInfo.chainName.toLowerCase().includes(trimSearch) ||
          trimSearch === "eth")
    );

    disabledChainInfos = [
      ...new Set([...disabledChainInfos, ...disabledStarknetChainInfos]),
    ].sort((a, b) => a.chainName.localeCompare(b.chainName));

    return disabledChainInfos.reduce(
      (acc, chainInfo) => {
        let embedded: boolean | undefined = false;
        let stored: boolean = true;

        const isStarknet = "starknet" in chainInfo;

        try {
          if (isStarknet) {
            embedded = true;
          } else {
            const chainInfoInStore = chainStore.getChain(chainInfo.chainId);

            if (!chainInfoInStore) {
              stored = false;
            } else {
              if (chainInfoInStore.hideInUI) {
                return acc;
              }

              stored = true;
              embedded = chainInfoInStore.embedded?.embedded;
            }
          }
        } catch (e) {
          // got an error while getting chain info
          embedded = undefined;
          stored = false;
        }

        const chainItem = {
          embedded: !!embedded,
          stored,
          chainInfo,
        };

        acc.push(chainItem);

        return acc;
      },
      [] as {
        embedded: boolean;
        stored: boolean;
        chainInfo: ChainInfo | ModularChainInfo;
      }[]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chainStore,
    chainStore.modularChainInfosInUI,
    searchedChainInfos,
    trimSearch,
  ]);

  const TokenViewData: {
    title: string;
    balance: ViewToken[];
    lenAlwaysShown: number;
    tooltip?: string | React.ReactElement;
  }[] = [
    {
      title: intl.formatMessage({
        id: "page.main.available.available-balance-title",
      }),
      balance: allBalancesSearchFiltered,
      lenAlwaysShown: 10,
      tooltip: intl.formatMessage({
        id: "page.main.available.available-balance-tooltip",
      }),
    },
  ];

  const numFoundToken = useMemo(() => {
    if (chainStore.tokenScans.length === 0) {
      return 0;
    }

    const set = new Set<string>();

    for (const tokenScan of chainStore.tokenScans) {
      for (const info of tokenScan.infos) {
        for (const asset of info.assets) {
          const key = `${ChainIdHelper.parse(tokenScan.chainId).identifier}/${
            asset.currency.coinMinimalDenom
          }`;
          set.add(key);
        }
      }
    }

    return Array.from(set).length;
  }, [chainStore.tokenScans]);

  const [isFoundTokenModalOpen, setIsFoundTokenModalOpen] = useState(false);

  const isShowNotFound =
    allBalancesSearchFiltered.length === 0 &&
    trimSearch.length > 0 &&
    lookingForChains.length === 0;

  const [searchParams, setSearchParams] = useSearchParams();

  const tokenDetailInfo: {
    chainId: string | null;
    coinMinimalDenom: string | null;
    isTokenDetailModalOpen: boolean | null;
  } = (() => {
    return {
      chainId: searchParams.get("tokenChainId"),
      coinMinimalDenom: searchParams.get("tokenCoinMinimalDenom"),
      // modal의 close transition을 유지하기 위해서는 위의 두 field가 존재하는지 만으로 판단하면 안된다...
      // close transition이 끝난후에 위의 두 값을 지워줘야한다.
      // close가 될 것인지는 밑의 값으로 판단한다.
      isTokenDetailModalOpen:
        searchParams.get("isTokenDetailModalOpen") === "true",
    };
  })();

  return (
    <React.Fragment>
      {isNotReady ? (
        <TokenItem
          viewToken={{
            token: new CoinPretty(
              chainStore.chainInfos[0].currencies[0],
              new Dec(0)
            ),
            chainInfo: chainStore.chainInfos[0],
            isFetching: false,
            error: undefined,
          }}
          isNotReady={isNotReady}
        />
      ) : (
        <React.Fragment>
          <Stack gutter="0.5rem">
            {TokenViewData.map(
              ({ title, balance, lenAlwaysShown, tooltip }) => {
                if (balance.length === 0) {
                  return null;
                }

                return (
                  <CollapsibleList
                    key={title}
                    hideNumInTitle={uiConfigStore.isPrivacyMode}
                    notRenderHiddenItems={true}
                    onCollapse={(isCollapsed) => {
                      if (isCollapsed) {
                        onMoreTokensClosed();
                      }
                    }}
                    title={
                      <TokenTitleView
                        title={title}
                        tooltip={tooltip}
                        right={
                          hasLowBalanceTokens ? (
                            <React.Fragment>
                              <Caption2
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  uiConfigStore.setHideLowBalance(
                                    !uiConfigStore.isHideLowBalance
                                  );
                                }}
                                color={ColorPalette["gray-300"]}
                              >
                                <FormattedMessage id="page.main.available.hide-low-balance" />
                              </Caption2>

                              <Gutter size="0.25rem" />

                              <Checkbox
                                size="extra-small"
                                checked={uiConfigStore.isHideLowBalance}
                                onChange={() => {
                                  uiConfigStore.setHideLowBalance(
                                    !uiConfigStore.isHideLowBalance
                                  );
                                }}
                              />
                            </React.Fragment>
                          ) : undefined
                        }
                      />
                    }
                    lenAlwaysShown={lenAlwaysShown}
                    items={balance.map((viewToken) => (
                      <TokenItem
                        viewToken={viewToken}
                        key={`${viewToken.chainInfo.chainId}-${viewToken.token.currency.coinMinimalDenom}`}
                        onClick={() => {
                          setSearchParams((prev) => {
                            prev.set(
                              "tokenChainId",
                              viewToken.chainInfo.chainId
                            );
                            prev.set(
                              "tokenCoinMinimalDenom",
                              viewToken.token.currency.coinMinimalDenom
                            );
                            prev.set("isTokenDetailModalOpen", "true");

                            return prev;
                          });
                        }}
                        copyAddress={(() => {
                          // For only native tokens, show copy address button
                          if (
                            new DenomHelper(
                              viewToken.token.currency.coinMinimalDenom
                            ).type !== "native" ||
                            viewToken.token.currency.coinMinimalDenom.startsWith(
                              "ibc/"
                            )
                          ) {
                            return undefined;
                          }

                          const account = accountStore.getAccount(
                            viewToken.chainInfo.chainId
                          );
                          const isEVMOnlyChain = chainStore.isEvmOnlyChain(
                            viewToken.chainInfo.chainId
                          );

                          return isEVMOnlyChain
                            ? account.ethereumHexAddress
                            : account.bech32Address;
                        })()}
                        showPrice24HChange={
                          uiConfigStore.show24HChangesInMagePage
                        }
                      />
                    ))}
                  />
                );
              }
            )}
          </Stack>
          {lookingForChains.length > 0 && (
            <React.Fragment>
              {allBalancesSearchFiltered.length > 0 && (
                <Gutter size="1rem" direction="vertical" />
              )}
              <LookingForChains lookingForChains={lookingForChains} />
            </React.Fragment>
          )}
          {isShowNotFound ? (
            <Box marginY="2rem">
              <EmptyView>
                <Stack alignX="center" gutter="0.1rem">
                  <Subtitle3 style={{ fontWeight: 700 }}>
                    <FormattedMessage id="page.main.available.search-empty-view-title" />
                  </Subtitle3>
                  <Subtitle3>
                    <FormattedMessage id="page.main.available.search-empty-view-paragraph" />
                  </Subtitle3>
                </Stack>
              </EmptyView>
            </Box>
          ) : null}
          {numFoundToken > 0 ? (
            <Box padding="0.75rem">
              <YAxis alignX="center">
                <NewTokenFoundButton
                  text={intl.formatMessage(
                    { id: "page.main.available.new-token-found" },
                    { numFoundToken }
                  )}
                  size="small"
                  onClick={() => setIsFoundTokenModalOpen(true)}
                />
              </YAxis>
            </Box>
          ) : null}
        </React.Fragment>
      )}

      <Modal
        isOpen={isFoundTokenModalOpen && numFoundToken > 0}
        align="bottom"
        close={() => setIsFoundTokenModalOpen(false)}
      >
        <TokenFoundModal close={() => setIsFoundTokenModalOpen(false)} />
      </Modal>

      <Modal
        isOpen={
          tokenDetailInfo.chainId != null &&
          tokenDetailInfo.chainId.length > 0 &&
          tokenDetailInfo.coinMinimalDenom != null &&
          tokenDetailInfo.coinMinimalDenom.length > 0 &&
          tokenDetailInfo.isTokenDetailModalOpen === true
        }
        align="right"
        close={() => {
          setSearchParams((prev) => {
            prev.delete("isTokenDetailModalOpen");

            return prev;
          });
        }}
        onCloseTransitionEnd={() => {
          setSearchParams((prev) => {
            prev.delete("tokenChainId");
            prev.delete("tokenCoinMinimalDenom");

            return prev;
          });
        }}
        forceNotOverflowAuto={true}
      >
        {tokenDetailInfo.chainId != null &&
        tokenDetailInfo.chainId.length > 0 &&
        tokenDetailInfo.coinMinimalDenom != null &&
        tokenDetailInfo.coinMinimalDenom.length > 0 ? (
          <TokenDetailModal
            close={() => {
              setSearchParams((prev) => {
                prev.delete("isTokenDetailModalOpen");

                return prev;
              });
            }}
            chainId={tokenDetailInfo.chainId}
            coinMinimalDenom={tokenDetailInfo.coinMinimalDenom}
          />
        ) : null}
      </Modal>
    </React.Fragment>
  );
});
