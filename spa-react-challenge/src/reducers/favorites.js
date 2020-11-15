export default function favorites(state = [1011334], action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return [...state, action.id];
    case 'REMOVE_FAVORITE':
      return state.filter(id => id !== action.id);
    default:
      return state;
  }
}