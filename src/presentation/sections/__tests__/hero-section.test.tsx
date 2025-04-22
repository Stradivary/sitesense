import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import {HeroSection} from '../hero-section'
import { AnimatedPOI } from "../AnimatedPOI"

// Mock next-intl
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

// Mock framer-motion instead of motion/react-client
jest.mock('framer-motion', () => ({
    motion: {
        div: 'div',
        h1: 'h1',
        p: 'p',
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

describe('HeroSection', () => {
    it('renders the hero section with title and subtitle', () => {
        render(<HeroSection />)

        // Check if title is rendered
        expect(screen.getByText('title')).toBeInTheDocument()

        // Check if subtitle is rendered
        expect(screen.getByText('subtitle')).toBeInTheDocument()
    })

    it('renders animated POI elements', () => {
        render(<AnimatedPOI />)

        // Check if POI elements are rendered (3 points on the map)
        const poiElements = document.querySelectorAll('.rounded-full')
        expect(poiElements).toHaveLength(1)
    })
 
})