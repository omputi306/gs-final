const OPEN_DIALOG = "OPEN_DIALOG";
const CLOSE_DIALOG = "CLOSE_DIALOG";

export function openDialog(payload) {
  return {
    type: OPEN_DIALOG,
    payload,
  };
}

export function closeDialog() {
  return {
    type: CLOSE_DIALOG,
  };
}

const initState = null;

export default function dialogReducer(state = initState, { type, payload }) {
  switch (type) {
    case OPEN_DIALOG:
      const { dialogType, dialogProps, dialogData } = payload;
      return { show: true, dialogType, dialogProps, dialogData };
    case CLOSE_DIALOG:
      return null;
    default:
      return state;
  }
}