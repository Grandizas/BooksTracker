import { defineNuxtPlugin } from '#app';
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
  faEye,
  faHouse,
  faHeart,
  faBookOpen,
  faCircleCheck,
  faPlus,
  faUser,
  faGear,
  faBooks,
  faTrophy,
  faEyeSlash,
  faXmark,
  faPersonToDoor,
} from '@fortawesome/pro-regular-svg-icons';

config.autoAddCss = false;

library.add(
  faEye,
  faHouse,
  faHeart,
  faUser,
  faGear,
  faBooks,
  faTrophy,
  faBookOpen,
  faCircleCheck,
  faPlus,
  faEyeSlash,
  faXmark,
  faPersonToDoor,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
