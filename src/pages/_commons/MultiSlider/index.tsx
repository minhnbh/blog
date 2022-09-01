import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Range } from 'rc-slider';
import { isArray } from 'lodash';
import './assets/index.css';

export interface IMultiSliderProps {
  value?: number[];
  onChange?: (value: number[]) => void;
  pushable?: boolean;
  colors?: string[];
  allowCross?: boolean;
}

const MultiSlider: React.FC<IMultiSliderProps> = ({
  value: valueProp,
  pushable = true,
  colors,
  allowCross = false,
  onChange
}) => {
  const [value, setValue] = useState<number[]>([]);

  const handleChange = useCallback(
    (changeValue: number[]) => {
      const lastIndex = changeValue.length - 1;
      const formatData = [...changeValue.slice(0, lastIndex), 100];
      setValue(formatData);
      onChange &&
        onChange(
          changeValue?.map((item, index) => {
            if (index === 0) return item;
            if (index === lastIndex) return 100 - changeValue[index - 1];
            return changeValue[index] - changeValue[index - 1];
          })
        );
    },
    [onChange]
  );

  const trackStyle = useMemo<React.CSSProperties[] | undefined>(
    () =>
      colors?.map(color => ({
        backgroundColor: color
      })),
    [colors]
  );

  const handleStyle = useMemo<React.CSSProperties[] | undefined>(
    () =>
      valueProp?.map((_, index) => ({
        backgroundColor: 'white',
        display: index < valueProp.length - 1 ? 'block' : 'none'
      })),
    [valueProp]
  );

  useEffect(() => {
    if (
      !isArray(valueProp) ||
      valueProp.reduce((prev, current) => prev + current, 0) !== 100
    )
      return;
    setValue(
      // [25, 25, 25, 25] => [25, 50, 75, 100]
      valueProp?.map<number>((item, index) => {
        if (index === 0) return item;
        return valueProp
          .slice(0, index + 1)
          .reduce((prev, current) => prev + current, 0);
      }) || []
    );
  }, [valueProp]);

  return (
    <div className="w-100">
      <Range
        className="py-10"
        count={4}
        step={0.01}
        value={value}
        allowCross={allowCross}
        tabIndex={[0, 0]}
        pushable={pushable}
        trackStyle={trackStyle?.filter((_, index) => index > 0)}
        handleStyle={handleStyle}
        railStyle={trackStyle?.[0]}
        onChange={handleChange}
      />
    </div>
  );
};

export default MultiSlider;
