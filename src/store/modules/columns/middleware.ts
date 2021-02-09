import {
  ColumnsTypes,
} from './types';

export const ColumnsMiddleware = (store: any) => (next: any) => (action: any) => {
  return next(action);
};
