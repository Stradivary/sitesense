import { screen } from '@testing-library/react';
import LanguageSwitcher from '../LanguageSwitcher';
import { renderWithIntl } from '@/presentation/utils/test-utils';

// Mock the necessary hooks and functions
jest.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
}));

jest.mock('@/presentation/utils/i18n/routing', () => ({
  Link: ({ children, ...props }: any) => (
    <a data-testid={`link-${props.locale}`} {...props}>
      {children}
    </a>
  ),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('LanguageSwitcher', () => {
  it('renders EN and ID language options with separator', () => {
    renderWithIntl(<LanguageSwitcher />);
    
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('|')).toBeInTheDocument();
    expect(screen.getByText('ID')).toBeInTheDocument();
  });
  
  it('applies bold styling to the current locale', () => {
    renderWithIntl(<LanguageSwitcher />);
    
    const enLink = screen.getByText('EN').closest('a');
    const idLink = screen.getByText('ID').closest('a');
    
    expect(enLink?.className).toContain('font-bold');
    expect(idLink?.className).toContain('font-normal');
  });
  
  it('applies custom classes when provided', () => {
    renderWithIntl(<LanguageSwitcher className="test-class" />);
    
    const container = screen.getByText('EN').parentElement;
    expect(container?.className).toContain('test-class');
  });
});