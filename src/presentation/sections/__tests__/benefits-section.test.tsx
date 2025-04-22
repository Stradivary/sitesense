import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BenefitsSection } from '../benefits-section'

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
    BarChart3: () => <div data-testid="bar-chart-icon">BarChart3</div>,
    MapPin: () => <div data-testid="map-pin-icon">MapPin</div>,
    TrendingUp: () => <div data-testid="trending-up-icon">TrendingUp</div>,
    Users: () => <div data-testid="users-icon">Users</div>,
}))

jest.mock('next-intl', () => ({
    useTranslations: () => {
        const t = (key: string) => {
            const translations: { [key: string]: string } = {
                'title': 'Benefits Title',
                'subtitle': 'Benefits Subtitle',
                'accuracy': 'Accuracy Text',
                'cta': 'Schedule Demo',
                'benefits.0.title': 'Benefit 1',
                'benefits.0.description': 'Description 1',
                'benefits.1.title': 'Benefit 2',
                'benefits.1.description': 'Description 2',
                'benefits.2.title': 'Benefit 3',
                'benefits.2.description': 'Description 3',
                'benefits.3.title': 'Benefit 4',
                'benefits.3.description': 'Description 4',
            }
            return translations[key] || key
        }
        return t
    }
}))

describe('BenefitsSection', () => {
    it('renders the benefits section with title and statistics', () => {
        render(<BenefitsSection />)
        
        expect(screen.getByText('Benefits Title')).toBeInTheDocument()
        expect(screen.getByText('Benefits Subtitle')).toBeInTheDocument()
        expect(screen.getByText('8,400')).toBeInTheDocument()
        expect(screen.getByText('97%')).toBeInTheDocument()
    })

    it('renders all benefit cards', () => {
        render(<BenefitsSection />)
        
        expect(screen.getByText('Benefit 1')).toBeInTheDocument()
        expect(screen.getByText('Description 1')).toBeInTheDocument()
        expect(screen.getByText('Benefit 4')).toBeInTheDocument()
        expect(screen.getByText('Description 4')).toBeInTheDocument()
    })

    it('renders CTA button', () => {
        render(<BenefitsSection />)
        
        const ctaButton = screen.getByText('Schedule Demo')
        expect(ctaButton).toBeInTheDocument()
        expect(ctaButton.closest('a')).toHaveAttribute('href', '#schedule-demo')
    })

    it('renders all icons', () => {
        render(<BenefitsSection />)
        
        expect(screen.getByTestId('bar-chart-icon')).toBeInTheDocument()
        expect(screen.getByTestId('map-pin-icon')).toBeInTheDocument()
        expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument()
        expect(screen.getByTestId('users-icon')).toBeInTheDocument()
    })
})