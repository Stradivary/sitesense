import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { HowItWorks } from '../how-it-works'

jest.mock('next-intl', () => ({
    useTranslations: () => {
        const t = (key: string) => key
        t.raw = () => ({
            step1: { step: 'Step 1', title: 'Step 1 Title', description: 'Step 1 Description' },
            step2: { step: 'Step 2', title: 'Step 2 Title', description: 'Step 2 Description' },
            step3: { step: 'Step 3', title: 'Step 3 Title', description: 'Step 3 Description' },
            step4: { step: 'Step 4', title: 'Step 4 Title', description: 'Step 4 Description' }
        })
        return t
    }
}))

describe('HowItWorks', () => {
    it('renders section titles', () => {
        render(<HowItWorks />)
        
        expect(screen.getByText('sectionTitle')).toBeInTheDocument()
        expect(screen.getByText('sectionSubtitle')).toBeInTheDocument()
        expect(screen.getByText('sectionDescription')).toBeInTheDocument()
    })

    it('renders all steps', () => {
        render(<HowItWorks />)
        
        for (let i = 1; i <= 3; i++) {
            expect(screen.getByText(`step${i}.step`)).toBeInTheDocument()
            expect(screen.getByText(`step${i}.title`)).toBeInTheDocument()
            expect(screen.getByText(`step${i}.description`)).toBeInTheDocument()
        }
    })

    it('renders timeline dots', () => {
        render(<HowItWorks />)
        
        const timelineDots = document.querySelectorAll('.timeline-dot')
        expect(timelineDots).toHaveLength(3)
    })
})