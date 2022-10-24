import React from 'react';
import Select, { components } from 'react-select';

const CustomSelectContainer = ({ children, hasValue, ...props }) => {
  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }

  const CHIPS_LIMIT = 1;
  const [chips, otherChildren] = children;
  
  const overflowCounter = Array.isArray(chips)?
    chips.slice(CHIPS_LIMIT).length : null;
  const displayChips = Array.isArray(chips)? 
    chips.slice(overflowCounter, overflowCounter + CHIPS_LIMIT) : chips;

  return (
    <components.ValueContainer {...props}>
        <div className='flex items-center justify-between'>
            {displayChips}
            {overflowCounter > 0 && `+ ${overflowCounter}`}
            {otherChildren}
        </div>
    </components.ValueContainer>
  );
};

export default ({ onChange, options, value, ...props }) => (
  <Select
    options={options}
    value={value}
    onChange={onChange}
    hideSelectedOptions={false}
    closeMenuOnSelect={false}
    isSearchable
    placeholder="Seleccionar"
    components={{ ValueContainer: CustomSelectContainer }}
    {...props}
  />
);