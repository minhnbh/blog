import { createContext } from 'react';

export interface DataAPIRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD';
  headers: Record<string, string>[];
  requestData: any;
}

export interface DataAPIMethod {
  (url: string): DataAPIRequest;
}

export interface DataAPIContextData {
  [methodName: string]: DataAPIMethod;
}

const DataApiContext = createContext<DataAPIContextData | undefined>(undefined);

export default DataApiContext;
