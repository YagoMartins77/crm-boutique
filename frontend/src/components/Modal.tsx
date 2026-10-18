import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '580px'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(24, 22, 21, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          width: '100%',
          maxWidth,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '24px 28px 20px 28px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              color: 'var(--color-noir)',
              margin: 0
            }}>
              {title}
            </h3>
            {subtitle && (
              <p style={{
                fontSize: '13px',
                color: 'var(--color-warm-gray)',
                marginTop: '4px'
              }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-warm-gray)',
              backgroundColor: 'var(--color-sand-light)',
              transition: 'var(--transition-fast)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-noir)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-warm-gray)'}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          padding: '24px 28px',
          overflowY: 'auto'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};
