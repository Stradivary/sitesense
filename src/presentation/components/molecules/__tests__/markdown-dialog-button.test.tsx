import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithIntl } from '../../../utils/test-utils';
import MarkdownDialogButton from '../markdown-dialog-button';
import React from 'react';

// Mock fetch
global.fetch = jest.fn();

// Mock useParams
jest.mock('next/navigation', () => ({
  useParams: () => ({ locale: 'en' }),
}));

// Mock react-markdown
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children: string }) {
    return <div data-testid="markdown-content">{children}</div>;
  };
});

// Mock rehype-raw
jest.mock('rehype-raw', () => {
  return {
    __esModule: true,
    default: jest.fn()
  };
});

// Create mockOnOpenChange variable outside to access it in tests
let mockOnOpenChange: ((open: boolean) => void) | undefined;

// Mock Dialog components
jest.mock('../../../components/atoms/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: (value: boolean) => void }) => {
    // Store the callback to use in tests
    mockOnOpenChange = onOpenChange;
    
    if (onOpenChange) {
      // Simulate opening dialog when the mock is rendered
      setTimeout(() => onOpenChange(true), 0);
    }
    return <div data-testid="dialog-mock">{open !== undefined ? open.toString() : 'undefined'} {children}</div>;
  },
  DialogTrigger: ({ children, className }: { children: React.ReactNode, className?: string }) => 
    <button data-testid="dialog-trigger-mock" className={className}>{children}</button>,
  DialogContent: ({ children, className }: { children: React.ReactNode, className?: string }) => 
    <div data-testid="dialog-content-mock" className={className}>{children}</div>,
  DialogTitle: ({ children, className }: { children: React.ReactNode, className?: string }) => 
    <h2 data-testid="dialog-title-mock" className={className}>{children}</h2>,
  DialogClose: ({ children, className }: { children: React.ReactNode, className?: string }) => 
    <button data-testid="dialog-close-mock" className={className} onClick={() => mockOnOpenChange && mockOnOpenChange(false)}>{children}</button>
}));

describe('MarkdownDialogButton Component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    mockOnOpenChange = undefined;
  });

  it('renders with default text when no children provided', () => {
    renderWithIntl(
      <MarkdownDialogButton 
        filePath="/i18n/file.en.md"
        fallbackFilePath="/i18n/file.en.md"
        dialogTitle="Test Dialog"
        translationKey="termsConditions"
      />
    );
    
    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument();
  });
  
  it('renders with children when provided', () => {
    renderWithIntl(
      <MarkdownDialogButton 
        filePath="/i18n/file.en.md"
        fallbackFilePath="/i18n/file.en.md"
        dialogTitle="Test Dialog"
      >
        Custom Label
      </MarkdownDialogButton>
    );
    
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
  });
  
  it('opens dialog when clicked and loads content', async () => {
    const mockMarkdown = '# Test Content\nThis is test markdown content.';
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockMarkdown)
    });
    
    renderWithIntl(
      <MarkdownDialogButton 
        filePath="/i18n/file.en.md"
        fallbackFilePath="/i18n/file.en.md"
        dialogTitle="Test Dialog"
      >
        Open Dialog
      </MarkdownDialogButton>
    );
    
    // Wait for content to load
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/i18n/file.en.md");
    });

    // After the fetch completes, the mock markdown content should be rendered
    await waitFor(() => {
      const markdownElement = screen.getByTestId('markdown-content');
      // Use a more flexible comparison approach that ignores whitespace differences
      expect(markdownElement.textContent?.replace(/\s+/g, ' ')).toContain(
        mockMarkdown.replace(/\s+/g, ' ').trim()
      );
    });
  });
  
  it('falls back to default language when specific language file not found', async () => {
    // First fetch fails, second succeeds
    const fallbackContent = '# Fallback Content';
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 404
      })
      .mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(fallbackContent)
      });
    
    renderWithIntl(
      <MarkdownDialogButton 
        filePath="/i18n/file.id.md"
        fallbackFilePath="/i18n/file.en.md"
        dialogTitle="Test Dialog"
      >
        Open Dialog
      </MarkdownDialogButton>
    );
    
    // Check that fallback was fetched
    await waitFor(() => {
      expect(fetch).toHaveBeenNthCalledWith(1, "/i18n/file.id.md");
      expect(fetch).toHaveBeenNthCalledWith(2, "/i18n/file.en.md");
    });

    // Verify fallback content is displayed
    await waitFor(() => {
      const markdownElement = screen.getByTestId('markdown-content');
      expect(markdownElement).toHaveTextContent(fallbackContent);
    });
  });

  it('shows error state when both primary and fallback file fetch fail', async () => {
    // Both fetches fail
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Server Error'
      });
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    renderWithIntl(
      <MarkdownDialogButton 
        filePath="/i18n/file.id.md"
        fallbackFilePath="/i18n/file.en.md"
        dialogTitle="Test Dialog"
      >
        Open Dialog
      </MarkdownDialogButton>
    );
    
    // Check that both fetches were attempted
    await waitFor(() => {
      expect(fetch).toHaveBeenNthCalledWith(1, "/i18n/file.id.md");
      expect(fetch).toHaveBeenNthCalledWith(2, "/i18n/file.en.md");
    });

    // Verify error message is displayed
    await waitFor(() => {
      expect(screen.getByText('Failed to load content. Please try again later.')).toBeInTheDocument();
    });

    // Verify console errors were logged
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('shows loading state while fetching content', async () => {
    // Create a promise that won't resolve immediately
    let resolvePromise: (value: any) => void;
    const delayedPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    (fetch as jest.Mock).mockImplementationOnce(() => {
      return delayedPromise;
    });
    
    renderWithIntl(
      <MarkdownDialogButton 
        filePath="/i18n/file.en.md"
        fallbackFilePath="/i18n/file.en.md"
        dialogTitle="Test Dialog"
      >
        Open Dialog
      </MarkdownDialogButton>
    );
    
    // Check that loading indicator is displayed
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    // Resolve the promise to complete the test
    resolvePromise!({
      ok: true,
      text: () => Promise.resolve('# Test Content')
    });
  });

  it('displays sr-only dialog title', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('# Test Content')
    });
    
    renderWithIntl(
      <MarkdownDialogButton 
        filePath="/i18n/file.en.md"
        fallbackFilePath="/i18n/file.en.md"
        dialogTitle="Accessibility Title"
      >
        Open Dialog
      </MarkdownDialogButton>
    );
    
    // Wait for dialog to open
    await waitFor(() => {
      const dialogTitle = screen.getByTestId('dialog-title-mock');
      expect(dialogTitle).toHaveTextContent('Accessibility Title');
      expect(dialogTitle).toHaveClass('sr-only');
    });
  });

  it('resets content when dialog is closed and opened again', async () => {
    // Set up mocks
    const mockMarkdown = '# Test Content';
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockMarkdown)
    });
    
    // Render component
    renderWithIntl(
      <MarkdownDialogButton 
        filePath="/i18n/file.en.md"
        fallbackFilePath="/i18n/file.en.md"
        dialogTitle="Test Dialog"
      >
        Open Dialog
      </MarkdownDialogButton>
    );

    // Wait for dialog to open and content to load
    await waitFor(() => {
      expect(screen.getByTestId('markdown-content')).toHaveTextContent(mockMarkdown);
    });

    // Verify fetch was called once
    expect(fetch).toHaveBeenCalledTimes(1);

    // Reset fetch mock to track new calls
    (fetch as jest.Mock).mockClear();
    
    // Use the exposed onOpenChange to close the dialog
    await act(async () => {
      if (mockOnOpenChange) {
        mockOnOpenChange(false);
      }
      // Small delay to let state updates process
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    // Now open the dialog again
    await act(async () => {
      if (mockOnOpenChange) {
        mockOnOpenChange(true);
      }
      // Small delay to let state updates process
      await new Promise(resolve => setTimeout(resolve, 10));
    });

    // Verify fetch was called again (which proves content was reset)
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  it('does not reset content when dialog remains open', async () => {
    // Set up mocks
    const mockMarkdown = '# Test Content';
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: () => Promise.resolve(mockMarkdown)
    });
    
    // Create a spy for React's useState to track setMarkdownContent calls
    const setStateSpy = jest.spyOn(React, 'useState');
    
    // Render component
    renderWithIntl(
      <MarkdownDialogButton 
        filePath="/i18n/file.en.md"
        fallbackFilePath="/i18n/file.en.md"
        dialogTitle="Test Dialog"
      >
        Open Dialog
      </MarkdownDialogButton>
    );

    // Wait for content to load
    await waitFor(() => {
      expect(screen.getByTestId('markdown-content')).toHaveTextContent(mockMarkdown);
    });

    // Reset our spy count now that initial rendering is done
    setStateSpy.mockClear();

    // Trigger a state update but keep the dialog open (isOpen remains true)
    await act(async () => {
      // Force a re-render without changing isOpen to false
      if (mockOnOpenChange) {
        // Set to true again (even though it's already true) to trigger the effect dependency
        mockOnOpenChange(true);
      }
      await new Promise(resolve => setTimeout(resolve, 10));
    });
    
    // Verify content wasn't reset (setMarkdownContent wasn't called with empty string)
    // This is an indirect test since we can't directly check component state
    expect(screen.getByTestId('markdown-content')).toHaveTextContent(mockMarkdown);
    expect(fetch).toHaveBeenCalledTimes(1); // Fetch shouldn't be called again
    
    // Clean up
    setStateSpy.mockRestore();
  });
});