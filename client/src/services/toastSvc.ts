import Vue from "vue";

/* 
  Display a success message with correct settings.
*/
export const showSuccessToast = (message: string) => {
  Vue.toasted.success(message, {
    duration: 2000,
    theme: "bubble"
  });
};

/*
  Display an error message with correct settings.
*/
export const showErrorToast = (message: string) => {
  Vue.toasted.error(message, {
    duration: 2000,
    theme: "bubble"
  });
};
