const initialState = {
  movie: [],
};

const Movie = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DATA_MOVIE': {
      return {
        ...state,
        movie: action.payload,
      };
    }
    default:
      return state;
  }
};
export default Movie;
