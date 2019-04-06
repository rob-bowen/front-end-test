import Vue from "vue";

export const showSuccessToast = (message: string) => {
  Vue.toasted.success(message, {
    duration: 2000,
    theme: "bubble"
  });
};

export const showErrorToast = (message: string) => {
  Vue.toasted.error(message, {
    duration: 2000,
    theme: "bubble"
  });
};
