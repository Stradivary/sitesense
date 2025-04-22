import { render, screen } from '@testing-library/react';
import PrivacyPolicySection from './../privacy-policy-section';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key === 'privacyPolicy' ? 'Privacy Policy' : key,
}));

describe('PrivacyPolicySection', () => {
  it('renders without crashing', () => {
    render(<PrivacyPolicySection />);
    expect(screen.getAllByText('Privacy Policy').length).toBeGreaterThan(0);
  });
});
