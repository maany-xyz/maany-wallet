import React, {FunctionComponent} from 'react';
import {
  IFeeConfig,
  IGasConfig,
  IGasSimulator,
  ISenderConfig,
} from '@keplr-wallet/hooks';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../../stores';
import {FormattedMessage, useIntl} from 'react-intl';
import {Box} from '../../box';
import {BaseModalHeader} from '../../modal';
import {Label} from '../label';
import {useStyle} from '../../../styles';
import {FeeSelector} from './fee-selector';
import {Toggle} from '../../toggle';
import {Column, Columns} from '../../column';
import {Gutter} from '../../gutter';
import {Text} from 'react-native';
import {Button} from '../../button';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import {TextInput} from '../text-input/text-input';
import {Dropdown} from '../../dropdown';
import {Dec} from '@keplr-wallet/unit';

export const TransactionFeeModal: FunctionComponent<{
  senderConfig: ISenderConfig;
  feeConfig: IFeeConfig;
  gasConfig: IGasConfig;
  gasSimulator?: IGasSimulator;
}> = observer(({senderConfig, feeConfig, gasConfig, gasSimulator}) => {
  const {queriesStore} = useStore();
  const intl = useIntl();
  const style = useStyle();
  const {dismiss} = useBottomSheetModal();

  const isGasSimulatorUsable = (() => {
    if (!gasSimulator) {
      return false;
    }

    if (gasSimulator.gasEstimated == null && gasSimulator.uiProperties.error) {
      return false;
    }

    return true;
  })();

  const isGasSimulatorEnabled = (() => {
    if (!isGasSimulatorUsable) {
      return false;
    }
    return gasSimulator?.enabled;
  })();

  return (
    <Box padding={12}>
      <BaseModalHeader
        title={intl.formatMessage({
          id: 'components.input.fee-control.modal.title',
        })}
        titleStyle={style.flatten(['h4', 'text-left'])}
      />

      <Label
        content={intl.formatMessage({
          id: 'components.input.fee-control.modal.fee-title',
        })}
      />
      <FeeSelector feeConfig={feeConfig} />

      <Gutter size={12} />

      <Dropdown
        label={intl.formatMessage({
          id: 'components.input.fee-control.modal.fee-token-dropdown-label',
        })}
        items={feeConfig.selectableFeeCurrencies
          .filter((cur, i) => {
            if (i === 0) {
              return true;
            }

            const balance = queriesStore
              .get(feeConfig.chainId)
              .queryBalances.getQueryBech32Address(senderConfig.sender)
              .getBalanceFromCurrency(cur);

            return balance.toDec().gt(new Dec(0));
          })
          .map(cur => {
            return {
              key: cur.coinMinimalDenom,
              label: cur.coinDenom,
            };
          })}
        selectedItemKey={feeConfig.fees[0]?.currency.coinMinimalDenom}
        onSelect={() => {}}
        size="large"
      />

      <Gutter size={12} />

      <Box borderWidth={1} borderColor={style.get('color-gray-500').color} />

      <Gutter size={12} />

      {isGasSimulatorUsable && gasSimulator ? (
        <Columns sum={1} alignY="center">
          <Label
            content={intl.formatMessage({
              id: 'components.input.fee-control.modal.gas-title',
            })}
          />

          <Column weight={1} />

          <Text style={style.flatten(['subtitle3', 'color-gray-200'])}>
            <FormattedMessage id="components.input.fee-control.modal.auto-title" />
          </Text>

          <Gutter size={8} />
          <Toggle
            isOpen={gasSimulator.enabled}
            setIsOpen={isOpen => {
              gasSimulator?.setEnabled(isOpen);
            }}
          />
        </Columns>
      ) : null}

      <Gutter size={12} />

      {isGasSimulatorEnabled ? (
        <TextInput
          label={intl.formatMessage({
            id: 'components.input.fee-control.modal.gas-adjustment-label',
          })}
          value={gasSimulator?.gasAdjustmentValue}
          onChangeText={text => {
            gasSimulator?.setGasAdjustmentValue(text);
          }}
        />
      ) : (
        <TextInput
          label={intl.formatMessage({
            id: 'components.input.fee-control.modal.gas-amount-label',
          })}
          value={gasConfig.value}
          onChangeText={text => {
            gasConfig.setValue(text);
          }}
        />
      )}

      <Gutter size={12} />

      <Button
        text={intl.formatMessage({
          id: 'button.close',
        })}
        color="secondary"
        size="large"
        onPress={() => {
          dismiss();
        }}
      />
    </Box>
  );
});
