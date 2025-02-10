"use client";

import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import PHONE_CODES from "../utils/countryCodes";

const FlagSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState("MX");

  const customLabels = Object.entries(PHONE_CODES).reduce(
    (acc, [code, value]) => {
      acc[code] = `${value.primary} ${value.secondary}`;
      return acc;
    },
    {}
  );

  const handleSelect = (code) => {
    setSelected(code);
    const phoneCode = PHONE_CODES[code].secondary;
    onSelect(phoneCode);
  };

  return (
    <ReactFlagsSelect
      selected={selected}
      onSelect={handleSelect}
      customLabels={customLabels}
      placeholder="País"
      searchable
      searchPlaceholder="Busca tu país"
      className="flag-select"
      selectedSize={20}
      optionsSize={15}
      fullWidth={false}
      showSelectedLabel={false}
      showOptionLabel={true}
    />
  );
};

export default FlagSelector;
