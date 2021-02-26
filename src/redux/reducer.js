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

const initialState = {
  form: {
    personalDetails: {
      name: '',
      ssn: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    businessDetails: {
      bName: '',
      stateRegistered: '',
      address: '',
      city: '',
      state: '',
      zipCode: '' 
    },
    debitDetails: {
      printedName: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    index: 1,
    businessChecked: false,
    debitPersonalChecked: false,
    debitBusinessChecked: false,
    personalForm: {},
    businessForm: {},
    debitForm: {},
  },
  usersList : []
};

const addReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_SAVE_1:
      return {
        ...state,
        form: {
          ...state.form,
          personalDetails: {...action.payload}
        }
      };
    case FORM_SAVE_2:
      return {
        ...state,
        form: {
          ...state.form,
          businessDetails: {...action.payload}
        }
      };
    case FORM_SAVE_3:
      return {
        ...state,
        form: {
          ...state.form,
          debitDetails: {...action.payload}
        }
      };
    case SET_INDEX:
      return {
        ...state,
        form: {
          ...state.form,
          index: action.payload
        }
      };
    case BUSINESS_CHECKED:
      return {
        ...state,
        form: {
          ...state.form,
          businessChecked: action.payload
        }
      };
    case SET_DEBIT_BUSINESS_CHECKED:
      return {
        ...state,
        form: {
          ...state.form,
          debitBusinessChecked: action.payload
        }
      };
    case SET_DEBIT_PERSONAL_CHECKED:
      return {
        ...state,
        form: {
          ...state.form,
          debitPersonalChecked: action.payload
        }
      };
    case SET_POPULATE_USERS_LIST:
      return {
        ...state,
        usersList: action.payload
      };
    case RESET:
      return {
        ...state,
        form: initialState.form
      };
    default:
      return state;
  }
}

export default addReducer;
