import ru from 'vuetify/es5/locale/ru'
import colors from 'vuetify/es5/util/colors'

export default {
    lang: {
        locales: { ru },
        current: 'ru',
    },
    theme: {
        dark: true,
        themes: {
          dark: {
            primary: colors.blue.darken2,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3
          }
        }
      }
}
