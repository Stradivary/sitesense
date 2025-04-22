import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { FAQSection } from '../faq-section'
import userEvent from '@testing-library/user-event'

// Mock motion properly
jest.mock('motion/react-client', () => ({
    __esModule: true,
    motion: {
        h2: (props: any) => <h2 {...props} />,
        div: (props: any) => <div {...props} />,
        p: (props: any) => <p {...props} />
    }
}))

jest.mock('lucide-react', () => ({
    BarChart3: () => <div data-testid="bar-chart-icon">BarChart3</div>,
    MapPin: () => <div data-testid="map-pin-icon">MapPin</div>,
    TrendingUp: () => <div data-testid="trending-up-icon">TrendingUp</div>,
    Users: () => <div data-testid="users-icon">Users</div>,
}))

jest.mock('next-intl', () => ({
    useTranslations: () => {
        const t = (key: string) => key
        t.raw = () => [
            { question: 'FAQ 1?', answer: 'Answer 1' },
            { question: 'FAQ 2?', answer: 'Answer 2' },
        ]
        return t
    }
}))

// Mock Accordion components
jest.mock('@/presentation/components/atoms/accordion', () => ({
    Accordion: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    AccordionItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    AccordionTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    AccordionContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

describe('FAQSection', () => {
    it('renders the FAQ section with title', () => {
        render(<FAQSection />)
        
        expect(screen.getByText('title')).toBeInTheDocument()
    })

    it('renders FAQ items', () => {
        render(<FAQSection />)
        
        expect(screen.getByText('FAQ 1?')).toBeInTheDocument()
        expect(screen.getByText('FAQ 2?')).toBeInTheDocument()
    })

    it('shows answer when FAQ item is clicked', async () => {
        render(<FAQSection />)
        
        const question = screen.getByText('FAQ 1?')
        await userEvent.click(question)
        
        expect(screen.getByText('Answer 1')).toBeVisible()
    })
})