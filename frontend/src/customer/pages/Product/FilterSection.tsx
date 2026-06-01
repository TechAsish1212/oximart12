import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import React, { useState } from "react";
import { colors } from "../../../data/filter/color";
import { price } from "../../../data/filter/price";
import { discount } from "../../../data/filter/discount";

const FilterSection = () => {
  const [expendColor, setExpendColor] = useState(false);

  const handleExpendColor = () => {
    setExpendColor(!expendColor);
  };


  return (
    <div className="-z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r ">
        <p className="text-lg font-semibold">Filters</p>
        <Button className="">Clear</Button>
      </div>

      <Divider />

      <div className="px-9 space-y-6 mt-5">

        {/* color */}
        <section>
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: purple[600],
              }}
            >
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-redio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {colors
                .slice(0, expendColor ? colors.length : 5)
                .map((item: any) => (
                  <FormControlLabel
                    value={item.name}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>
          </FormControl>
          <div>
            <Button onClick={handleExpendColor}>
              {expendColor ? "hide" : `+ ${colors.length - 5} more`}
            </Button>
          </div>
        </section>

        <Divider/>

        {/* price */}
        <section className="mt-4">
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: purple[600],
              }}
            >
              Price
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-redio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              className="mt-3"
            >
              {price
                .map((item: any) => (
                  <FormControlLabel
                    value={item.value}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </section>

        <Divider/>

        {/* discount */}
         <section className="mt-4">
          <FormControl sx={{ zIndex: 0 }}>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: purple[600],
              }}
            >
              Discount
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-redio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              className="mt-3"
            >
              {discount
                .map((item: any) => (
                  <FormControlLabel
                    value={item.value}
                    control={<Radio />}
                    label={item.name}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
