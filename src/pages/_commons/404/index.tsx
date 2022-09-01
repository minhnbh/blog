import { Button } from 'app/components';
import { COLORS } from 'app/constants/common';
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const Error404: React.FC = () => {
  return (
    <div className="vh-100 vw-100 flex-center flex-column">
      <FaTimesCircle size={100} color={COLORS.PRIMARY_RED} />
      <h1 className="mt-36 color-primary-red">Không tìm thấy trang</h1>
      <div className="mt-36">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => (window.location.href = '/')}
          className="fs-18"
        >
          Trang chủ
        </Button>
      </div>
    </div>
  );
};

export default Error404;
