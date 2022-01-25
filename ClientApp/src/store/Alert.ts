import { AlertConstants } from "./constants/alert.constants";

interface Action {
    type: string;
    message?: string;
}

export const AlertActions = {
    success,
    error,
    clear
};

function success(message: string) {
    return { type: AlertConstants.SUCCESS, message };
}

function error(message: string) {
    return { type: AlertConstants.ERROR, message };
}

function clear() {
    return { type: AlertConstants.CLEAR };
}

export function Alert(state = {}, action: Action) {
    switch (action.type) {
      case AlertConstants.SUCCESS:
        return {
          type: 'alert-success',
          message: action.message
        };
      case AlertConstants.ERROR:
        return {
          type: 'alert-danger',
          message: action.message
        };
      case AlertConstants.CLEAR:
        return {};
      default:
        return state
    }
  }