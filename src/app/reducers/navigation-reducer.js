import navigationTypes from '../actions/navigation-types';

const initialValue = {
  title      : 'Melvin Laplanche',
  description: 'Full Stack engineer based in L.A.',
  color      : '#6db8e4',
};

export default function navigationReducer(state = initialValue, action) {
  if (action.type === navigationTypes.UPDATE) {
    return {
      ...state,
      ...action.data,
    };
  }

  return state;
}
