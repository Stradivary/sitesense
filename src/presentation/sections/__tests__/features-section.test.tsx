import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react' 
import { FeaturesSection } from '../features-section'

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />
}))

// Mock useTranslations before the component import
jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
    motion: {
        h2: (props: any) => <h2 {...props} />,
        p: (props: any) => <p {...props} />,
        div: (props: any) => <div {...props} />
    }
}))

// Mock tabs components
jest.mock('@/presentation/components/atoms/tabs', () => ({
    Tabs: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
    TabsList: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
    TabsTrigger: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
    TabsContent: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>
}))

 
describe('FeaturesSection', () => {
    it('renders the features section with title and description', () => {
        render(<FeaturesSection />)
        
        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('description')).toBeInTheDocument()
    })

    it('renders all feature tabs', () => {
        render(<FeaturesSection />)
        
        expect(screen.getByText('Personalized')).toBeInTheDocument()
        expect(screen.getByText('Acurate')).toBeInTheDocument()
        expect(screen.getByText('Cost-effective')).toBeInTheDocument()
    })

    it('renders feature images', () => {
        render(<FeaturesSection />)
        
        const images = screen.getAllByRole('img')
        expect(images).toHaveLength(3)
        expect(images[0]).toHaveAttribute('src', '/potloc-feature.png')
        expect(images[0]).toHaveAttribute('alt', 'Area Analysis Interface')
    })
})