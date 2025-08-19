import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';

export default function FontSizeSelector({
  value,
  onChange,
}: {
  value: 'small' | 'medium' | 'large';
  onChange: (fontSize: 'small' | 'medium' | 'large') => void;
}) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newSize) => newSize && onChange(newSize)}
      aria-label="字体大小选择"
    >
      <ToggleButton value="small" aria-label="小号">
        <TextDecreaseIcon sx={{ mr: 1 }} />
        小号
      </ToggleButton>
      <ToggleButton value="medium" aria-label="中号">
        <TextFieldsIcon sx={{ mr: 1 }} />
        中号
      </ToggleButton>
      <ToggleButton value="large" aria-label="大号">
        <TextIncreaseIcon sx={{ mr: 1 }} />
        大号
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
