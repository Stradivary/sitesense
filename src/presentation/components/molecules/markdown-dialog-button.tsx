"use client";
import { useTranslations } from 'next-intl';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '../atoms/dialog';
import styles from '../../styles/markdown.module.css';
import { cn } from '../../utils';

export interface MarkdownDialogButtonProps {
    className?: string;
    filePath: string;
    fallbackFilePath: string;
    dialogTitle: string;
    translationKey?: string;
}

const MarkdownDialogButton: React.FC<PropsWithChildren<MarkdownDialogButtonProps>> = ({
    className,
    children,
    filePath,
    fallbackFilePath,
    dialogTitle,
    translationKey
}) => {
    const t = useTranslations("SiteFooter");
    const [isOpen, setIsOpen] = useState(false);
    const [markdownContent, setMarkdownContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const fetchMarkdownContent = async (path: string, isFallback = false) => {
        try {
            setIsLoading(true);
            const response = await fetch(path);
            if (!response.ok) {
                console.error(`Failed to load ${isFallback ? 'fallback' : ''} ${dialogTitle}:`, response.statusText);
                throw new Error(`Failed to load ${dialogTitle}: ${response.statusText}`);
            }
            const text = await response.text();
            setMarkdownContent(text);
            setIsLoading(false);
            setHasError(false);
        } catch (error) {
            console.error(`Error loading ${isFallback ? 'fallback' : ''} ${dialogTitle}:`, error);
            if (!isFallback && path !== fallbackFilePath) {
                // Try with fallback path
                fetchMarkdownContent(fallbackFilePath, true);
            } else {
                setIsLoading(false);
                setHasError(true);
            }
        }
    };

    useEffect(() => {
        // Load markdown content when dialog is opened
        if (isOpen && !markdownContent && !isLoading) {
            fetchMarkdownContent(filePath);
        }
    }, [isOpen, markdownContent, filePath, fallbackFilePath, dialogTitle, isLoading]);

    // Reset content when dialog is closed
    useEffect(() => {
        if (!isOpen) {
            setMarkdownContent('');
        }
    }, [isOpen]);

    const buttonText = children ?? (translationKey && t ? t(translationKey) : dialogTitle);

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className={cn(`hover:text-white p-2 mt-0`, className)}>
                    {buttonText}
                </DialogTrigger>
                <DialogContent className='bg-white p-4 max-w-3xl'>
                    <DialogTitle className='sr-only'>{dialogTitle}</DialogTitle>
                    <div className={`max-h-[70vh] overflow-y-auto pr-2 mt-4 text-gray-800 ${styles.markdownContent}`}>
                        {isLoading && (
                            <div className="py-4 text-center">Loading...</div>
                        )}

                        {hasError && (
                            <div className="py-4 text-center text-red-500">
                                Failed to load content. Please try again later.
                            </div>
                        )}

                        {markdownContent ? (
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {markdownContent}
                            </ReactMarkdown>
                        ) : null}
                    </div>
                    <DialogClose className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        Close
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default MarkdownDialogButton;
