import React from 'react';

export const useModal = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);

  return {
    isModalOpen,
    closeModal: () => setModalOpen(false),
    openModal: () => setModalOpen(true),
  };
};

export default useModal;
