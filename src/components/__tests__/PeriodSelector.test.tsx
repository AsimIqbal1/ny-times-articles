import { render, screen, fireEvent } from '@testing-library/react';
import PeriodSelector, { Period } from '../PeriodSelector';

describe('PeriodSelector', () => {
    const mockOnChange = jest.fn();

    beforeEach(() => {
        mockOnChange.mockClear();
    });

    it('renders all period options', () => {
        render(<PeriodSelector value={7} onChange={mockOnChange} />);

        expect(screen.getByRole('button', { name: /today/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /last 7 days/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /last 30 days/i })).toBeInTheDocument();
    });

    it('shows the selected period', () => {
        render(<PeriodSelector value={7} onChange={mockOnChange} />);

        const sevenDaysButton = screen.getByRole('button', { name: /last 7 days/i });
        expect(sevenDaysButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('calls onChange when a different period is selected', () => {
        render(<PeriodSelector value={7} onChange={mockOnChange} />);

        const todayButton = screen.getByRole('button', { name: /today/i });
        fireEvent.click(todayButton);

        expect(mockOnChange).toHaveBeenCalledWith(1 as Period);
    });

    it('does not call onChange when the same period is selected', () => {
        render(<PeriodSelector value={7} onChange={mockOnChange} />);

        const sevenDaysButton = screen.getByRole('button', { name: /last 7 days/i });
        fireEvent.click(sevenDaysButton);

        expect(mockOnChange).not.toHaveBeenCalled();
    });
}); 