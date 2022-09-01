import { isEmpty } from 'lodash';
import { FileRejection } from 'react-dropzone';

interface IUploadFileValidator {
  size?: number;
  types?: string[];
}

export const IMAGE_TYPES = ['image/jpg', 'jpeg', 'png', 'svg'];

export const updateImageValidator = (
  file: File,
  params?: IUploadFileValidator
) => {
  const { size, types = IMAGE_TYPES } = params || {};
  if (size) {
    if (file.size > size) {
      return {
        code: 'invalidFileSize',
        message: `File tải lên không vượt quá ${
          size / 1024000
        }MB. Vui lòng chọn file khác.`
      };
    }
  }
  if (types) {
    if (!types.map(item => `image/${item}`).includes(file.type.toLowerCase())) {
      return {
        code: 'invalidFileType',
        message: 'File không hợp lệ.'
      };
    }
  }
  return null;
};

export const formatUploadFileErrorMessage = (errors: FileRejection) => {
  if (!errors) return null;
  return errors.errors.reduce(
    (prev, current) =>
      isEmpty(prev) ? current.message : `${prev}, ${current.message}`,
    ''
  );
};
