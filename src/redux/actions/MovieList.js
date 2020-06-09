import axios from 'axios';
import config from '../../utils/config';

export const getDataMovie = (page) => async (dispatch) => {
  try {
    const res = await axios.get(config.APP_API.concat(`&page=${page}`));
    console.log(res.data);
    if (res.data) {
      dispatch({
        type: 'GET_DATA_MOVIE',
        payload: res.data,
      });
    } else {
      console.log('data not available');
    }
  } catch (err) {
    console.log(err);
  }
};
