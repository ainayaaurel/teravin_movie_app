import axios from 'axios';
import config from '../../utils/config';

export const getDataMovie = () => async (dispatch) => {
  try {
    const res = await axios.get(config.APP_API);
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
