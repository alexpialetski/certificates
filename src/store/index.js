import sampleData from "../initialState";
import storeFactory from "./middleware";

const initialState = (localStorage["redux-store"]) ?
    JSON.parse(localStorage["redux-store"]) :
    sampleData;

const saveState = () =>
    localStorage["redux-store"] = JSON.stringify(store.getState());

const store = storeFactory(initialState);
store.subscribe(saveState);

export default store;