import React, { ReactNode } from 'react';
import TextTruncate, { TextTruncateProps } from 'react-text-truncate';

export interface ITruncateText extends TextTruncateProps {
  children?: ReactNode;
}

const TruncateText: React.FC<ITruncateText> = ({
  children,
  element = 'span',
  truncateText = '...',
  line = 1
}) => {
  return (
    <TextTruncate
      text={children?.toString()}
      truncateText={truncateText}
      line={line}
      element={element}
    />
  );
};

export default TruncateText;
