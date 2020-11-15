export default function heroes(state = [], action) {
  switch (action.type) {
    case 'LOAD_HEROES_LIST':
      return action.heroes;
    case 'CLEAR_HEROES_LIST':
      return [];
    default:
      return state;
  }
}