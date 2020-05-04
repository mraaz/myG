
import { store } from '../redux/Store';
import { alertAction } from '../redux/actions/alertAction';

export function showMessengerAlert(label, onConfirm, onCancel, confirmText) {
  window.messengerSweetAlert = {
    label: label || "Alert",
    onConfirm: () => {
      if (onConfirm) onConfirm();
      clearMessengerAlert();
    },
    onCancel: onCancel || clearMessengerAlert,
    confirmText: confirmText || "Ok",
  };
  store.dispatch(alertAction(true));
}

export function clearMessengerAlert() {
  window.messengerSweetAlert = null;
  store.dispatch(alertAction(false));
}
