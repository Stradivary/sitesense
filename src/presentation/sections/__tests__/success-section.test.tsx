import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import SuccessScreen from '../success-section';
import { renderWithIntl } from '@/presentation/utils/test-utils';

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
    Check: () => <div data-testid="check-icon">Check</div>,
}));

// Mock routing
jest.mock('@/presentation/utils/i18n/routing', () => ({
    Link: ({ children, ...props }: any) => (
        <a {...props}>{children}</a>
    ),
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useParams: () => ({ locale: 'en' }),
}));

describe('SuccessScreen', () => {
    it('renders the success header with logo', () => {
        renderWithIntl(<SuccessScreen />);
        
        expect(screen.getByText('Telkomsel')).toBeInTheDocument();
        expect(screen.getByText('POTLOC')).toBeInTheDocument();
    });

    it('renders success message and check icon', () => {
        renderWithIntl(<SuccessScreen />);
        
        expect(screen.getByText('Permintaan berhasil dikirim')).toBeInTheDocument();
        expect(screen.getByText('Harap menunggu, tim Potloc akan segera menghubungi Anda.')).toBeInTheDocument();
    });

    it('renders back to home button', () => {
        renderWithIntl(<SuccessScreen />);
        
        const button = screen.getByText('Kembali ke Home');
        expect(button).toBeInTheDocument();
        expect(button.closest('button')).toHaveClass('bg-red-500');
    });

    it('renders footer with copyright', () => {
        renderWithIntl(<SuccessScreen />);
        
        expect(screen.getByText('Potloc copyright ©2024')).toBeInTheDocument();
    });

    it('renders check icon', () => {
        renderWithIntl(<SuccessScreen />);
        expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });
    
    it('renders language switcher with EN and ID options', () => {
        renderWithIntl(<SuccessScreen />);
        
        expect(screen.getByText('EN')).toBeInTheDocument();
        expect(screen.getByText('|')).toBeInTheDocument();
        expect(screen.getByText('ID')).toBeInTheDocument();
    });
});