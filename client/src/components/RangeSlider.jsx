import React from "react";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { Box } from "@mui/material";

export default function RangeSlider({ value, onChange }) {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <Box  sx={{
      width: {
          xs: '90%',    // Small screens: 90% width
          sm: '70%',    // Medium screens: 70% width
          md: '100%',      // Large screens: 100% width
      },
      margin: '20px auto',
      padding: '10px',
      color: '#F7569B',      // Primary color
        '& .MuiSlider-thumb': {
          backgroundColor: '#F7569B' // Thumb color
        },
        '& .MuiSlider-track': {
          backgroundColor: '#F7569B' // Track color
        },
        '& .MuiSlider-rail': {
          backgroundColor: 'gray' // Rail (inactive track) color
        }
  }}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={1}
        max={14000}
        step={100}
        disableSwap
        getAriaLabel={() => "Price range"}
        getAriaValueText={(value) => `${value}`}
        aria-labelledby="price-range-slider"
      />
      <Typography id="price-range-slider" sx={{ fontWeight: "bold", textAlign: "center", mt: 1 ,color:"black",fontSize:"14px" }}>
        Selected Range: ${value[0]} - ${value[1]}
      </Typography>
    </Box>
  );
}
