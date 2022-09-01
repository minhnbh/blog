import React, { ReactNode, useMemo } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';

export interface ISpeedometer {
  startColor?: string;
  endColor?: string;
  maxSegmentLabels?: number;
  width?: number;
  height?: number;
  value?: number;
  minText?: string | ReactNode;
  maxText?: string | ReactNode;
}

const Speedometer: React.FC<ISpeedometer> = ({
  startColor = 'red',
  endColor = 'green',
  maxSegmentLabels = 0,
  value: valueProp,
  width = 0,
  height = 0,
  minText,
  maxText
}) => {
  const value = useMemo(() => valueProp, [valueProp]);

  return (
    <div
      className="position-relative"
      style={{
        width: width,
        height: minText || maxText ? height * 0.67 : height * 0.5
      }}
    >
      <ReactSpeedometer
        needleColor="#CECEE3"
        startColor={startColor}
        endColor={endColor}
        minValue={0}
        maxValue={100}
        maxSegmentLabels={maxSegmentLabels}
        needleHeightRatio={1}
        segments={100}
        value={value}
        currentValueText=""
        ringWidth={18}
        width={width}
        height={height}
      />
      {minText && (
        <div className="position-absolute-top-start speedometer-bottom-text text-danger">
          {minText}
        </div>
      )}
      {maxText && (
        <div className="position-absolute-top-end speedometer-bottom-text text-success">
          {maxText}
        </div>
      )}
    </div>
  );
};

export default Speedometer;
