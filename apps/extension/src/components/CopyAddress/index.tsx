import React, { useState } from "react";
import { useIsNotReady } from "../../pages/main";
import { DepositModal } from "../../pages/main/components/deposit-modal";
import { Modal } from "../modal";
import { CopyAddress } from "../../pages/main/components";
import { useStore } from "../../stores";

const CopyAddressModal = () => {
  const isNotReady = useIsNotReady();
  const [isOpenDepositModal, setIsOpenDepositModal] = useState(false);
  const { analyticsStore } = useStore();
  return (
    <div>
      <CopyAddress
        onClick={() => {
          analyticsStore.logEvent("click_copyAddress");
          setIsOpenDepositModal(true);
        }}
        isNotReady={isNotReady}
      />
      <Modal
        isOpen={isOpenDepositModal}
        align="bottom"
        close={() => setIsOpenDepositModal(false)}
        /* Simplebar를 사용하면 트랜지션이 덜덜 떨리는 문제가 있다... */
        forceNotUseSimplebar={true}
      >
        <DepositModal close={() => setIsOpenDepositModal(false)} />
      </Modal>
    </div>
  );
};

export default CopyAddressModal;
