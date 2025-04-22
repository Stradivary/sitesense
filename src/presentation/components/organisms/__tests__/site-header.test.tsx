import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { SiteHeader } from '../site-header'

// Mock the LanguageSwitcher component
jest.mock('@/presentation/components/atoms/LanguageSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid="language-switcher">EN | ID</div>
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Check: () => <div data-testid="check-icon">Check</div>,
}));

// Mock Button component
jest.mock('@/presentation/components/atoms/button', () => ({
  Button: ({ children, className }: any) => (
    <button className={className}>{children}</button>
  ),
}));

// Mock routing
jest.mock('@/presentation/utils/i18n/routing', () => ({
  Link: ({ children, href, className }: any) => (
    <a href={href} className={className}>{children}</a>
  ),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));


jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    about: 'About',
    howItWorks: 'How It Works',
    faq: 'FAQ',
    scheduleDemo: 'Schedule Demo'
  })[key]
}));

describe('SiteHeader', () => {
  beforeEach(() => {
    // Reset window.scrollY
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 0
    });
  });

  it('renders navigation links', () => {
    render(<SiteHeader />)

    expect(screen.getByText('About')).toHaveAttribute('href', '#about')
    expect(screen.getByText('How It Works')).toHaveAttribute('href', '#howItWorks')
    expect(screen.getByText('FAQ')).toHaveAttribute('href', '#faqs')
  })

  it('renders schedule demo button', () => {
    render(<SiteHeader />)

    const button = screen.getByText('Schedule Demo')
    expect(button).toBeInTheDocument()
    expect(button.closest('button')).toHaveClass('rounded-sm')
  })

  it('has correct styling classes for initial state', () => {
    render(<SiteHeader />)

    const header = screen.getByRole('banner')
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
    expect(header).toHaveClass('bg-transparent')
    expect(header).not.toHaveClass('shadow-lg')

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('hidden', 'gap-6', 'md:flex')
  })

  it('renders language switcher', () => {
    render(<SiteHeader />)

    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
  })

  it('applies scrolled styling when window is scrolled', () => {
    render(<SiteHeader />)
    
    // Initial state check
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-transparent')
    expect(header).not.toHaveClass('shadow-lg')
    
    // Simulate scroll
    act(() => {
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        value: 20
      });
      fireEvent.scroll(window);
    });
    
    // After scroll check
    expect(header).not.toHaveClass('bg-transparent')
    expect(header).toHaveClass('bg-gradient-to-r', 'from-[#001A41]', 'via-[#001A41]', 'to-[#0E336C]', 'shadow-lg')
  })

  it('displays the logo with proper styles', () => {
    render(<SiteHeader />)
    
    const logo = screen.getByAltText('SiteSense Logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/logo_sitesense.png')
    expect(logo).toHaveAttribute('width', '127px')
    expect(logo).toHaveAttribute('height', '40px')
    expect(logo).toHaveClass('brightness-0', 'invert')
    
    // Test logo styles change when scrolled
    act(() => {
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        value: 20
      });
      fireEvent.scroll(window);
    });
    
    expect(logo).not.toHaveClass('brightness-0', 'invert')
  })

  it('changes navlink styles when scrolled', () => {
    render(<SiteHeader />)
    
    const aboutLink = screen.getByText('About')
    // Check initial state
    expect(aboutLink).toHaveClass('text-white/90', 'hover:text-white')
    
    // Simulate scroll
    act(() => {
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        value: 20
      });
      fireEvent.scroll(window);
    });
    
    // Classes should still be the same since they don't change between variants
    expect(aboutLink).toHaveClass('text-white/90', 'hover:text-white')
  })

  it('removes event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = render(<SiteHeader />)
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})