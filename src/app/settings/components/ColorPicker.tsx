import { useState } from 'react';
import { Box, Button, Popover } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';

const colors = [
  '#ef5350', // Red
  '#ec407a', // Pink
  '#ab47bc', // Purple
  '#7e57c2', // Deep Purple
  '#5c6bc0', // Indigo
  '#42a5f5', // Blue
  '#29b6f6', // Light Blue
  '#26c6da', // Cyan
  '#26a69a', // Teal
  '#66bb6a', // Green
  '#9ccc65', // Light Green
  '#d4e157', // Lime
  '#ffee58', // Yellow
  '#ffca28', // Amber
  '#ffa726', // Orange
  '#ff7043', // Deep Orange
];

export default function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorSelect = (color: string) => {
    onChange(color);
    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<ColorLensIcon />}
        variant="outlined"
        sx={{
          borderColor: value,
          color: value,
          '&:hover': {
            borderColor: value,
            backgroundColor: `${value}10`,
          },
        }}
      >
        选择颜色
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
            {colors.map((color) => (
              <Box
                key={color}
                onClick={() => handleColorSelect(color)}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: color,
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: value === color ? '2px solid black' : 'none',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Popover>
    </>
  );
}
