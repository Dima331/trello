import { fetchImageSuccess, fetchImageFailure } from './actions';
import { ImageTypes } from './types';

const getUrlImageMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === ImageTypes.FETCH_IMAGE_REQUEST) {
    const formData = new FormData();

    formData.append('file', action.payload.image);
    formData.append('upload_preset', 'mlwert');

    const options = {
      method: 'POST',
      body: formData,
    };

    fetch('https://api.cloudinary.com/v1_1/drihtpnyw/image/upload', options)
      .then(res => res.json())
      .then(res => {
        store.dispatch(fetchImageSuccess(res.url));
      })
      .catch(() => {
        store.dispatch(fetchImageFailure());
      });
  }

  return next(action);
};

export default getUrlImageMiddleware;
