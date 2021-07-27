import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);


import th from 'vuetify/lib/locale/th'
import zhHans from 'vuetify/lib/locale/zh-Hans'
import en from 'vuetify/lib/locale/en'

export default new Vuetify({
  lang: {
    locales: { th, zhHans, en },
    current: 'en',
  },
  theme: { light: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
  }, },
  breakpoint: {
    thresholds: {   // 
      xs: 600,   //手机
      sm: 960,   //平板
      md: 1264,   //电脑
      lg: 1904,   //桌面端
      // xl     // 大屏
    },
    scrollBarWidth: 50,
    mobileBreakpoint: 2500 // 屏幕框小于该值时，this.$vuetify.breakpoint.monile为true
  },
});
