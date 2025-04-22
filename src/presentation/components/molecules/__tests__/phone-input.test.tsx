import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { PhoneInput } from '../phone-input'

describe('PhoneInput', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders with the correct prefix and placeholder', () => {
    render(<PhoneInput value="" onChange={mockOnChange} />)
    
    expect(screen.getByText('+62')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('8xxxxxxxxx')).toBeInTheDocument()
  })

  it('handles input changes and sanitizes numbers', () => {
    render(<PhoneInput value="" onChange={mockOnChange} />)
    const input = screen.getByRole('textbox')
    
    // Test regular input
    fireEvent.change(input, { target: { value: '81234567890' } })
    expect(mockOnChange).toHaveBeenCalledWith('81234567890')
    
    // Test input starting with 0
    fireEvent.change(input, { target: { value: '081234567890' } })
    expect(mockOnChange).toHaveBeenCalledWith('81234567890')
    
    // Test input starting with 62
    fireEvent.change(input, { target: { value: '6281234567890' } })
    expect(mockOnChange).toHaveBeenCalledWith('81234567890')
  })

  it('removes non-digit characters', () => {
    render(<PhoneInput value="" onChange={mockOnChange} />)
    const input = screen.getByRole('textbox')
    
    fireEvent.change(input, { target: { value: '08-123-456.789' } })
    expect(mockOnChange).toHaveBeenCalledWith('8123456789')
  })

  it('handles direct value updates', () => {
    const { rerender } = render(<PhoneInput value="81234567890" onChange={mockOnChange} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('81234567890')
    
    rerender(<PhoneInput value="89876543210" onChange={mockOnChange} />)
    expect(input).toHaveValue('89876543210')
  })

  it('handles paste events and sanitizes pasted content', () => {
    render(<PhoneInput value="" onChange={mockOnChange} />)
    const input = screen.getByRole('textbox')
    
    // Test pasting regular number
    const pasteEvent = new Event('paste', { bubbles: true }) as any
    pasteEvent.clipboardData = {
      getData: () => '81234567890'
    }
    fireEvent(input, pasteEvent)
    expect(mockOnChange).toHaveBeenCalledWith('81234567890')
    
    // Test pasting number with leading 0 (covers line 17)
    mockOnChange.mockClear()
    const pasteEventWithZero = new Event('paste', { bubbles: true }) as any
    pasteEventWithZero.clipboardData = {
      getData: () => '081234567890'
    }
    fireEvent(input, pasteEventWithZero)
    expect(mockOnChange).toHaveBeenCalledWith('81234567890')
    
    // Test pasting number with leading 62 (covers lines 19-20)
    mockOnChange.mockClear()
    const pasteEventWith62 = new Event('paste', { bubbles: true }) as any
    pasteEventWith62.clipboardData = {
      getData: () => '6281234567890'
    }
    fireEvent(input, pasteEventWith62)
    expect(mockOnChange).toHaveBeenCalledWith('81234567890')
    
    // Test pasting with non-numeric characters
    mockOnChange.mockClear()
    const pasteEventWithSymbols = new Event('paste', { bubbles: true }) as any
    pasteEventWithSymbols.clipboardData = {
      getData: () => '+62 812-3456-7890'
    }
    fireEvent(input, pasteEventWithSymbols)
    expect(mockOnChange).toHaveBeenCalledWith('81234567890')
  })

  it('applies custom classNames correctly', () => {
    render(
      <PhoneInput 
        value="81234567890" 
        onChange={mockOnChange} 
        className="custom-class"
      />
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-class')
    expect(input).toHaveClass('pl-12')
  })
})