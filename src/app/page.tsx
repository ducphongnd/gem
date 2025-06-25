"use client";
import React, { useState } from "react";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function ValueStepper() {
  
  const [inputValue, setInputValue] = useState("1.0");
  const [unit, setUnit] = useState("%");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(",", "."); 
    const matched = value.match(/^[0-9]*\.?[0-9]*/);
    const sanitizedValue = matched ? matched[0] : "";
    setInputValue(sanitizedValue);
  };

  const handleBlur = () => {
    let numValue = parseFloat(inputValue);

    if (isNaN(numValue)) {
      numValue = 0; 
    }
    if (numValue < 0) {
      numValue = 0; 
    }
    if (unit === "%" && numValue > 100) {
      numValue = 100; 
    }

    setInputValue(String(numValue));
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    if (newUnit === "%" && parseFloat(inputValue) > 100) {
      setInputValue("100"); 
    }
  };

  const step = 1; 

  const handleIncrement = () => {
    let numValue = parseFloat(inputValue) || 0;
    let newValue = numValue + step;
    if (unit === "%" && newValue > 100) {
      newValue = 100;
    }
    setInputValue(String(newValue));
  };

  const handleDecrement = () => {
    let numValue = parseFloat(inputValue) || 0;
    let newValue = numValue - step;
    if (newValue < 0) {
      newValue = 0;
    }
    setInputValue(String(newValue));
  };

  const isDecrementDisabled = parseFloat(inputValue) <= 0;
  const isIncrementDisabled = unit === "%" && parseFloat(inputValue) >= 100;

  const incrementTooltipMessage =
    unit === "%" ? "Value must smaller than 100" : "";
  const decrementTooltipMessage = "Value must greater than 0";

  return (
    <div className="bg-zinc-900 p-10 font-sans">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Unit */}
        <div className="flex items-center gap-2">
          <h2 className="w-[100]">Unit</h2>
          <div className="flex items-center gap-0.5 bg-[#212121] p-0.5 rounded-md">
            <button
              onClick={() => handleUnitChange("%")}
              className={cn(
                "w-[67] h-8 px-3 py-1 text-sm rounded-md transition-colors",
                unit === "%"
                  ? "bg-[#3a3a3a] text-white" 
                  : "text-gray-400 hover:bg-[#4a4a4a]" 
              )}
            >
              %
            </button>
            <button
              onClick={() => handleUnitChange("px")}
              className={cn(
                "w-[67] h-8 px-[28.5] py-[6] text-sm rounded-md transition-colors",
                unit === "px"
                  ? "bg-[#3a3a3a] text-white" 
                  : "text-gray-400 hover:bg-[#4a4a4a]" 
              )}
            >
              px
            </button>
          </div>
        </div>

        {/* Value */}
        <div className="flex item-center gap-2">
          <h2 className="w-[100] my-auto">Value </h2>
          <div className="group flex items-center bg-[#212121] rounded-md ring-1 ring-transparent focus-within:ring-[#3C67FF] transition">
            <div className="group relative">
              {isDecrementDisabled && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-[#212121] text-white text-xs rounded shadow-lg whitespace-nowrap z-10
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 pointer-events-none
                              before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-x-transparent before:border-b-transparent before:border-t-[#212121]"
                >
                  {decrementTooltipMessage}
                </div>
              )}

              <button
                onClick={handleDecrement}
                disabled={isDecrementDisabled}
                className="item flex items-center justify-center w-9 h-9 p-2 text-white hover:bg-[#3B3B3B] disabled:hover:bg-[#212121] rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className="item flex-grow w-[68] h-9 bg-transparent text-center text-white focus:outline-none hover:bg-[#3b3b3b]"
            />
            <div className="group relative">
              {isIncrementDisabled && ( 
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-[#212121] text-white text-xs rounded shadow-lg whitespace-nowrap z-10
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 pointer-events-none
                              before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-x-transparent before:border-b-transparent before:border-t-[#212121]"
                >
                  {incrementTooltipMessage}
                </div>
              )}
              <button
                onClick={handleIncrement}
                disabled={isIncrementDisabled}
                className="item flex items-center justify-center w-9 h-9 p-2 text-white hover:bg-[#3B3B3B] disabled:hover:bg-[#212121] rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
