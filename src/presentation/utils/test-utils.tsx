import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

// Mock messages for testing
const messages = {
  en: {
    common: {
      // Add common messages here
    },
    SiteFooter: {
      termsConditions: 'Terms & Conditions',
      privacyPolicy: 'Privacy Policy'
    }
  },
  id: {
    common: {
      // Add common messages here
    },
    SiteFooter: {
      termsConditions: 'Syarat & Ketentuan',
      privacyPolicy: 'Kebijakan Privasi'
    }
  }
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: 'en' | 'id';
}

export function renderWithIntl(
  ui: ReactElement,
  { locale = 'en', ...renderOptions }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages[locale]}>
        {children}
      </NextIntlClientProvider>
    );
  }
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing-library
export * from '@testing-library/react';