import { defineNuxtPlugin } from '#app';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import specific icons
import {
  faEye,
  faHouse,
  faHeart,
  faBookOpen,
  faCircleCheck,
  faPlus,
  faUser,
  faEyeSlash,
  faXmark,
} from '@fortawesome/pro-regular-svg-icons';

// Prevent auto-adding CSS since Nuxt handles it
config.autoAddCss = false;

library.add(
  faEye,
  faHouse,
  faHeart,
  faUser,
  faBookOpen,
  faCircleCheck,
  faPlus,
  faEyeSlash,
  faXmark,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
