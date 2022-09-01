import React, { useMemo } from 'react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { Button } from 'app/components';
import { MONTHS_STRING } from 'app/constants/common';
import OptionDropdown from './OptionDropdown';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const DatePickerHeader = React.forwardRef<
  HTMLDivElement,
  ReactDatePickerCustomHeaderProps
>(
  (
    { monthDate, increaseMonth, decreaseMonth, changeYear, changeMonth },
    ref
  ) => {
    const currentMonth = useMemo(
      () => new Date(monthDate || '').getMonth(),
      [monthDate]
    );
    const currentYear = useMemo(
      () => new Date(monthDate || '').getFullYear(),
      [monthDate]
    );
    const yearLength = new Date().getFullYear() - 1900;
    const years = Array.from(
      { length: yearLength },
      (_, i) => yearLength - i + 1900
    );

    return (
      <div className="d-flex align-items-center px-8 py-4" ref={ref}>
        <Button
          className="mr-auto text-start"
          size="sm"
          onClick={decreaseMonth}
        >
          <FaChevronLeft color="#CC0100" />
        </Button>
        <OptionDropdown
          options={years}
          value={currentYear.toString()}
          onChange={value => changeYear(+value)}
        />
        <OptionDropdown
          className="ml-8"
          options={MONTHS_STRING}
          value={MONTHS_STRING[currentMonth]}
          onChange={value => changeMonth(MONTHS_STRING.indexOf(value))}
        />
        {/* <b className="color-white">
        {MONTHS_STRING[monthDate.getMonth()]}, {monthDate.getFullYear()}
      </b> */}
        <Button className="ml-auto text-end" size="sm" onClick={increaseMonth}>
          <FaChevronRight color="#CC0100" />
        </Button>
      </div>
    );
  }
);

export default DatePickerHeader;
