import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { CTASection } from '../cta-section'

jest.mock('next-intl', () => ({
    useTranslations: () => {
        const t = (key: string) => key;
        t.rich = (key: string, params?: any) => {
            let result = key;
            if (params) {
                Object.keys(params).forEach(param => {
                    result = result.replace(`{${param}}`, params[param]('content'));
                });
            }
            return result;
        };
        return t;
    }
}));

// Mock the ContactForm component since it's tested separately
jest.mock('@/presentation/components/molecules/contact-form', () => ({
    ContactForm: () => <div data-testid="contact-form">Contact Form</div>
}))

describe('CTASection', () => {
    it('renders the CTA section with title', () => {
        render(<CTASection />)
        
        expect(screen.getByText('title')).toBeInTheDocument()
    })

    it('renders the contact form', () => {
        render(<CTASection />)
        
        expect(screen.getByTestId('contact-form')).toBeInTheDocument()
    })
})