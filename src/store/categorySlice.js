import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    status: STATUS.IDLE,
    catProductAll: [],
    catProductAllStatus: STATUS.IDLE,
    catProductSingle: [],
    catProductSingleStatus: STATUS.IDLE,
  },
  reducers: {
    setCategories(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      console.log('state, action: ', action);
      state.status = action.payload;
    },
    setCategoriesProductAll(state, action) {
      state.catProductAll.push(action.payload);
    },
    setCategoriesStatusAll(state, action) {
      state.catProductAllStatus = action.payload;
    },
    setCategoriesProductSingle(state, action) {
      state.catProductSingle = action.payload;
    },
    setCategoriesStatusSingle(state, action) {
      state.catProductSingleStatus = action.payload;
    },
  },
});
console.log("categorySlice: ", categorySlice);
export const {
  setCategories,
  setStatus,
  setCategoriesProductAll,
  setCategoriesStatusAll,
  setCategoriesProductSingle,
  setCategoriesStatusSingle,
} = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = () => {
  return async function fetchCategoryThunk(dispatch) {
    console.log("dispatch: ", dispatch);
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await fetch(`${BASE_URL}categories`);
      const data = await response.json();
      console.log('data:------ ', data);
      dispatch(setCategories(data.slice(0, 5)));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      console.log("error: ", error);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
};

export const fetchProductsByCategory = (categoryID, dataType) => {
  console.log("categoryID, dataType: ", categoryID, dataType);
  return async function fetchCategoryProductThunk(dispatch) {
    console.log("dispatch: ", dispatch);
    if (dataType === "all") dispatch(setCategoriesStatusAll(STATUS.LOADING));
    if (dataType === "single")
      dispatch(setCategoriesStatusSingle(STATUS.LOADING));
    try {
      const reponse = await fetch(
        `${BASE_URL}categories/${categoryID}/products`
      );
      const data = await reponse.json();
      if (dataType === "all") {
        dispatch(setCategoriesProductAll(data.slice(1, 10)));
        dispatch(setCategoriesStatusAll(STATUS.IDLE));
      }
      if (dataType === "singel") {
        dispatch(setCategoriesProductSingle(data.slice(0, 20)));
        dispatch(setCategoriesStatusSingle(STATUS.IDLE));
      }
    } catch (error) {
      if (dataType === "all") dispatch(setCategoriesProductAll(STATUS.ERROR));
      if (dataType === "single")
        dispatch(setCategoriesStatusSingle(STATUS.ERROR));
    }
  };
};
