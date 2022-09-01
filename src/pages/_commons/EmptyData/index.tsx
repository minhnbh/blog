import { Button } from 'app/components';
import { COLORS } from 'app/constants/common';
import React from 'react';
import { FaFolderOpen, FaSync } from 'react-icons/fa';

interface IEmptyDataProps {
  message?: string;
  onRefresh?: () => void;
}

const EmptyData: React.FC<IEmptyDataProps> = ({
  message = 'Không tìm thấy dữ liệu. Vui lòng tải lại!',
  onRefresh
}) => {
  const handleRefresh = () => {
    onRefresh && onRefresh();
  };

  return (
    <div className="vh-50 flex-center flex-column">
      <FaFolderOpen size={100} color={COLORS.GRAY_L01} />
      <div className="fs-16 mt-16 color-gray-l01">{message}</div>
      <div className="mt-16">
        <Button variant="outline-secondary" onClick={handleRefresh}>
          <FaSync size={14} />
          <span className="ml-8 fs-16">Tải lại</span>
        </Button>
      </div>
    </div>
  );
};

export default EmptyData;
