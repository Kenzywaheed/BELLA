import React from 'react';
import { useToast } from '../context/ToastContext';

function Toast() {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <div className={`toast-notification toast-${toast.type} slide-up`}>
      <span className="toast-icon">{toast.type === 'success' ? '✓' : 'ℹ'}</span>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}

export default Toast;
