export default function heroes(state = [], action) {
  switch (action.type) {
    case 'LOAD_HEROES_LIST':
      return state.heroes = action.heroes;
    case 'CLEAR_HEROES_LIST':
      return [];
    default:
      return state;
  }
}