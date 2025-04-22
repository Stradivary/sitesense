"use client";
import React, { createContext, useContext, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { ReCaptcha } from '../atoms/ReCaptcha';

interface ReCaptchaContextType {
    recaptchaRef: React.RefObject<ReCAPTCHA | null>;
    executeReCaptcha: () => Promise<string | null>;
}

const ReCaptchaContext = createContext<ReCaptchaContextType | undefined>(undefined);

export function useReCaptcha() {
    const context = useContext(ReCaptchaContext);
    if (!context) {
        throw new Error('useReCaptcha must be used within a ReCaptchaProvider');
    }
    return context;
}

export function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const executeReCaptcha = async () => {
        if (!recaptchaRef.current) return null;
        return await recaptchaRef.current.executeAsync();
    };

    return (
        <ReCaptchaContext.Provider value={{ recaptchaRef, executeReCaptcha }}>
            <ReCaptcha ref={recaptchaRef} onVerify={() => { }} />
            {children}
        </ReCaptchaContext.Provider>
    );
}