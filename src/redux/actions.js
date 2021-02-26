import { 
  FORM_SAVE_1,
  FORM_SAVE_2,
  FORM_SAVE_3,
  SET_INDEX,
  BUSINESS_CHECKED,
  SET_DEBIT_BUSINESS_CHECKED,
  SET_DEBIT_PERSONAL_CHECKED,
  SET_POPULATE_USERS_LIST,
  RESET
} from "./actionTypes";

export const savePersonalDetails = form => {
  return {
    type: FORM_SAVE_1,
    payload: form,
  };
}

export const saveBusinessDetails = form => {
  return {
    type: FORM_SAVE_2,
    payload: form,
  };
}

export const saveDebitDetails = form => {
  return {
    type: FORM_SAVE_3,
    payload: form,
  };
}

export const setIndex = index => {
  return {
    type: SET_INDEX,
    payload: index,
  }; 
}

export const onBusinessCheckedChange = value => {
  return {
    type: BUSINESS_CHECKED,
    payload: value,
  };  
}

export const onDebitPersonalCheckedChange = value => {
  return {
    type: SET_DEBIT_PERSONAL_CHECKED,
    payload: value,
  };  
}

export const onDebitBusinessCheckedChange = value => {
  return {
    type: SET_DEBIT_BUSINESS_CHECKED,
    payload: value,
  };  
}

export const populateUsersList = data => {
  return {
    type: SET_POPULATE_USERS_LIST,
    payload: data,
  };  
}

export const handleReset = () => {
  return {
    type: RESET
  };  
}

