"use client";
import React, { PropsWithChildren } from 'react';
import MarkdownDialogButton from '../components/molecules/markdown-dialog-button';
import { useParams } from 'next/navigation';

const TermsConditionButton: React.FC<PropsWithChildren<{
    className?: string;
}>> = ({
    className,
    children
}) => {
    const { locale } = useParams();
    return (
        <MarkdownDialogButton
            className={className}
            filePath={`/i18n/tnc.${locale}.md`}
            fallbackFilePath="/i18n/tnc.en.md"
            dialogTitle="Terms & Conditions"
            translationKey="termsConditions"
        >
            {children}
        </MarkdownDialogButton>
    );
};

export default TermsConditionButton;