export interface historicInterface {
  date: number;
  increase: number;
  consumable: number;
}
export interface PouAttrs {
  userId: string;
  name: string;
  pettings: number;
  foodCapacity: historicInterface[];
  food: historicInterface[];
  cleanCapacity: historicInterface[];
  clean: historicInterface[];
}

interface FoodInventoryInterface {
  name: string;
  feedCapacity: number;
}

export interface InventoryAttrs {
  userId: string;
  coins: number;
  foodInventory: FoodInventoryInterface[];
}
