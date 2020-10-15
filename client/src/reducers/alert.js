const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      console.log('Alert');
      break;
    case 'SET_STATUS_XX':
      console.log('Status blank');
      break;
    default:
      console.log('Default');
      break;
  }

}