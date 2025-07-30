"use client";

import { useState } from 'react';
import EmailSubscribeModal from './EmailSubscribeModal';

interface GetUpdatesButtonProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline' | 'text';
  modalTitle?: string;
  modalDescription?: string;
}

export default function GetUpdatesButton({ 
  children = "Get Updates",
  className = "",
  variant = 'primary',
  modalTitle,
  modalDescription
}: GetUpdatesButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Determine button classes based on variant
  const getButtonClasses = () => {
    const baseClasses = className;
    
    switch (variant) {
      case 'outline':
        return `btn-outline-primary ${baseClasses}`;
      case 'text':
        return `text-secondary hover:text-white transition-colors ${baseClasses}`;
      case 'primary':
      default:
        return `btn-primary ${baseClasses}`;
    }
  };

  return (
    <>
      <button 
        className={getButtonClasses()}
        onClick={handleOpenModal}
      >
        {children}
      </button>

      <EmailSubscribeModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={modalTitle}
        description={modalDescription}
      />
    </>
  );
} 