"use client";
import React, { PropsWithChildren } from 'react';
import MarkdownDialogButton from '../components/molecules/markdown-dialog-button';
import { useParams } from 'next/navigation';

const PrivacyPolicyButton: React.FC<PropsWithChildren<{
    className?: string;
}>> = ({
    className,
    children
}) => {
    const { locale } = useParams();
    return (
        <MarkdownDialogButton
            className={className}
            filePath={`/i18n/privacy.${locale}.md`}
            fallbackFilePath="/i18n/privacy.en.md"
            dialogTitle="Privacy Policy"
            translationKey="privacyPolicy"
        >
            {children}
        </MarkdownDialogButton>
    );
};

export default PrivacyPolicyButton;