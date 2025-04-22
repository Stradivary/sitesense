import { render, screen } from '@testing-library/react';
import PrivacyPolicyButton from '../privacy-policy-button';
import MarkdownDialogButton from '../../components/molecules/markdown-dialog-button';

// Mock MarkdownDialogButton to simplify testing
jest.mock('../../components/molecules/markdown-dialog-button', () => {
  return jest.fn(({ children, className, dialogTitle, translationKey }) => (
    <button data-testid="markdown-dialog-button" className={className}>
      {children || (translationKey ? translationKey : dialogTitle)}
      <span data-testid="dialog-title">{dialogTitle}</span>
    </button>
  ));
});

// Mock Locale
jest.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
}));

describe('PrivacyPolicyButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the MarkdownDialogButton with correct props', () => {
    render(<PrivacyPolicyButton />);

    expect(MarkdownDialogButton).toHaveBeenCalledWith(
      expect.objectContaining({ "children": undefined, "className": undefined, "dialogTitle": "Privacy Policy", "fallbackFilePath": "/i18n/privacy.en.md", "filePath": "/i18n/privacy.en.md", "translationKey": "privacyPolicy" }),
      undefined
    );
  });

  it('passes className prop correctly', () => {
    render(<PrivacyPolicyButton className="custom-class" />);

    const button = screen.getByTestId('markdown-dialog-button');
    expect(button).toHaveClass('custom-class');
  });

  it('passes children prop correctly', () => {
    render(
      <PrivacyPolicyButton>
        Custom Privacy Text
      </PrivacyPolicyButton>
    );

    expect(screen.getByText('Custom Privacy Text')).toBeInTheDocument();
  });
});