import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/index'; 

const store = configureStore({
  reducer: rootReducer,
});

export default store;







// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from '../reducer';

// const store = createStore(
//   rootReducer,
//   applyMiddleware()
// );

// export default store;












// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducer';

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunk)
// );

// export default store;
