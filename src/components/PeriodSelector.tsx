import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

export type Period = 1 | 7 | 30;

interface PeriodSelectorProps {
    value: Period;
    onChange: (value: Period) => void;
}

const PeriodSelector = ({ value, onChange }: PeriodSelectorProps) => {
    const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: Period | null) => {
        if (newValue !== null) {
            onChange(newValue);
        }
    };

    return (
        <Box sx={{ mb: 3 }}>
            <ToggleButtonGroup
                value={value}
                exclusive
                onChange={handleChange}
                aria-label="time period"
                size="small"
                color="primary"
            >
                <ToggleButton value={1} aria-label="today">
                    Today
                </ToggleButton>
                <ToggleButton value={7} aria-label="last 7 days">
                    Last 7 Days
                </ToggleButton>
                <ToggleButton value={30} aria-label="last 30 days">
                    Last 30 Days
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default PeriodSelector; 