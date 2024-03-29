import React, { useState, useEffect } from "react";
import { Select, SelectItem, Input } from "@nextui-org/react";

interface Options {
  Option: Array<string>;
  heading: string;
  onChange?: any;
}

const OptionField: React.FC<Options> = ({ Option, heading, onChange }) => {
  const staticOption = "Specify";
  const validVariants = ["bordered"];
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (value: any) => {
    setSelectedOption(value);
    setError(null); // Reset error when an option is selected
    // Call the parent callback function with the updated data
    onChange && onChange(heading, value, inputValue);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    // Call the parent callback function with the updated data
    onChange && onChange(heading, selectedOption, value);
  };

  // Validate if an option is selected
  useEffect(() => {
    if (selectedOption === "" && inputValue === "") {
      setError(`${heading} is required`);
    } else {
      setError(null);
    }
    // Call the callback function with the initial values when the component mounts
    onChange && onChange(heading, selectedOption, inputValue);
  }, [selectedOption, inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col gap-4 w-full">
      {validVariants.map((variant) => (
        <div
          key={variant}
          className="flex flex-col lg-mob:w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
        >
          {selectedOption !== "Specify" ? (
            <div>
              <h1 className="text-md mb-2 font-semibold text-[#006FEE]">
                {heading}
              </h1>
              <Select
                label={heading}
                className="max-w-xs"
                value={selectedOption}
                onChange={(e) => handleOptionChange(e.target.value)}
              >
                {[...Option, staticOption].map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
            </div>
          ) : (
            <>
              {validVariants.map((variant: any) => (
                <div
                  key={variant}
                  className={`flex flex-col w-full flex-wrap md:flex-nowrap md:mb-0`}
                >
                  <h1 className="text-md font-semibold text-[#006FEE]">
                    {heading}
                  </h1>
                  <Input
                    type="text"
                    variant={variant}
                    value={inputValue}
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                  {/* Display error message if validation fails */}
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default OptionField;
