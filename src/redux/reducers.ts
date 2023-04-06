import {combineReducers} from 'redux';
import {InventoryAttrs, PouAttrs} from './interfaces';
import {ACTION_TYPES} from './actions';

const INITIAL_POU_STATE: PouAttrs = {
  userId: '',
  name: '',
  pettings: 0,
  foodCapacity: [],
  food: [],
  cleanCapacity: [],
  clean: [],
};
const pouReducer = (state = INITIAL_POU_STATE, action: any) => {
  console.log('pouReducer action', action);
  switch (action.type) {
    case ACTION_TYPES.SET_POU_STATUS:
      const {payload} = action;
      console.log('action', action);
      console.log('action', action);
      console.log('action', action);

      return {...state, ...payload};

    default:
      return state;
  }
};

const INITIAL_INVENTORY_STATE: InventoryAttrs = {
  userId: '',
  coins: 0,
  foodInventory: [],
};
const inventoryReducer = (state = INITIAL_INVENTORY_STATE, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_INVENTORY:
      const {payload} = action;

      return {...state, ...payload};

    default:
      return state;
  }
};
export default combineReducers({
  pou: pouReducer,
  inventory: inventoryReducer,
});
