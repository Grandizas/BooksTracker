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
  faBell,
  faUser,
  faCircleInfo,
  faCreditCard,
  faShield,
  faGear,
  faBooks,
  faTrophy,
  faStar,
  faEyeSlash,
  faXmark,
  faPersonToDoor,
  faArrowUpFromBracket,
} from '@fortawesome/pro-regular-svg-icons';

config.autoAddCss = false;

library.add(
  faEye,
  faHouse,
  faHeart,
  faBell,
  faUser,
  faCircleInfo,
  faCreditCard,
  faShield,
  faGear,
  faBooks,
  faTrophy,
  faBookOpen,
  faCircleCheck,
  faPlus,
  faStar,
  faEyeSlash,
  faXmark,
  faPersonToDoor,
  faArrowUpFromBracket,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon);
});
