import React from 'react';

const TermsConditionSection: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <a href="#" data-testid="terms-condition-link">{children}</a>;
};

export default TermsConditionSection;