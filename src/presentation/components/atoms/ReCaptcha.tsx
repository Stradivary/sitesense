import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';


export const ReCaptcha = React.forwardRef<ReCAPTCHA>(({ }, ref) => {
  return (
    <ReCAPTCHA
      ref={ref}
      size="invisible"
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
    />
  );
});

ReCaptcha.displayName = 'ReCaptcha';