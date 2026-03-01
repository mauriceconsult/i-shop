"use client";

import PreviewModal from "@/components/preview-modal";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

const ModalProvider = () => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModal />
    </>
  );
};

export default ModalProvider;
