export const ACTION_TYPES = {
  SET_POU_STATUS: 'SET_POU_STATUS',
  SET_INVENTORY: 'SET_INVENTORY',
};

export const setPouStatus = (pouStatus: any) => ({
  type: ACTION_TYPES.SET_POU_STATUS,
  payload: pouStatus,
});
export const setPouInventory = (inventory: any) => ({
  type: ACTION_TYPES.SET_INVENTORY,
  payload: inventory,
});
