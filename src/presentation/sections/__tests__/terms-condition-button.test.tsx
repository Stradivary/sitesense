import { render, screen } from '@testing-library/react';
import TermsConditionButton from '../terms-condition-button';
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


describe('TermsConditionButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the MarkdownDialogButton with correct props', () => {
        render(<TermsConditionButton />);

        expect(MarkdownDialogButton).toHaveBeenCalledWith(
            expect.objectContaining({
                filePath: `/i18n/tnc.en.md`,
                fallbackFilePath: '/i18n/tnc.en.md',
                dialogTitle: 'Terms & Conditions',
                translationKey: 'termsConditions',
            }),
           undefined
        );
    });

    it('passes className prop correctly', () => {
        render(<TermsConditionButton className="custom-class" />);

        const button = screen.getByTestId('markdown-dialog-button');
        expect(button).toHaveClass('custom-class');
    });

    it('passes children prop correctly', () => {
        render(
            <TermsConditionButton>
                Custom Terms Text
            </TermsConditionButton>
        );

        expect(screen.getByText('Custom Terms Text')).toBeInTheDocument();
    });
});