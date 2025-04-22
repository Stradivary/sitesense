import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { SiteFooter } from '../site-footer'

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Mail: () => <div data-testid="mail-icon">Mail</div>,
}))

// Fix mock path to match the actual import in the component
jest.mock('@/presentation/components/atoms/whatsapp', () => ({
  __esModule: true,
  default: () => <div data-testid="whatsapp-icon">WhatsApp</div>
}))

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    about: 'About',
    howItWorks: 'How It Works',
    faq: 'FAQ',
    copyright: '© 2025 SiteSense. All rights reserved.',
  })[key]
}))

// Mock the policy sections since they're tested separately
jest.mock('@/presentation/sections/privacy-policy-button', () => ({
  __esModule: true,
  default: () => <div data-testid="privacy-policy">Privacy Policy</div>
}))

jest.mock('@/presentation/sections/terms-condition-button', () => ({
  __esModule: true,
  default: () => <div data-testid="terms-conditions">Terms & Conditions</div>
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className }: any) => (
    <a href={href} className={className} data-testid="next-link">
      {children}
    </a>
  )
}))

jest.mock('@/presentation/components/atoms/LanguageSwitcherSelect', () => ({
  __esModule: true,
  default: ({ className }: any) => <div className={className} data-testid="language-switcher">Language Switcher</div>
}))

describe('SiteFooter', () => {

  it('renders navigation links', () => {
    render(<SiteFooter />)
    
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('How It Works')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
  })

  it('renders social media icons', () => {
    render(<SiteFooter />)
    
    expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument()
    expect(screen.getByTestId('mail-icon')).toBeInTheDocument()
  })

  it('renders copyright text', () => {
    render(<SiteFooter />)
    
    expect(screen.getByText('© 2025 SiteSense. All rights reserved.')).toBeInTheDocument()
  })

  // it('renders privacy policy and terms & conditions', () => {
  //   render(<SiteFooter />)
    
  //   expect(screen.getByTestId('privacy-policy')).toBeInTheDocument()
  //   expect(screen.getByTestId('terms-conditions')).toBeInTheDocument()
  // })

  it('has correct styling classes', () => {
    render(<SiteFooter />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-navy', 'text-white')
    
    const socialIcons = screen.getAllByRole('link', { name: /WhatsApp|Mail/i })
    socialIcons.forEach(icon => {
      expect(icon).toHaveClass('flex', 'h-10', 'w-10', 'items-center', 'justify-center', 'rounded-full')
    })
  })
})