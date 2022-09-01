import { isEmpty, isUndefined } from 'lodash';

export const replacePathParams = (path: string, params?: MagicKeyValue) => {
  let newPath = String(path);
  if (
    path.indexOf('{{') < 0 ||
    path.indexOf('}}') < 0 ||
    isEmpty(params) ||
    isUndefined(params)
  )
    return path;
  const entries = Object.entries(params);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    newPath = newPath.replace(`{{${key}}}`, value?.toString());
  }
  return newPath;
};
