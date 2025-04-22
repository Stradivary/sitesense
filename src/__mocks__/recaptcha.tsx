import { forwardRef } from 'react';

export const ReCaptcha = forwardRef<any, { onVerify: () => void }>(
  () => {
    return null; // Mock component returns null
  }
);

ReCaptcha.displayName = 'ReCaptcha';