// Styles
import '@mdi/font/css/materialdesignicons.css'

// Vuetify core
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { VDateInput } from 'vuetify/labs/components'
import { themeConfig } from './vuetifyTheme'

export default createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
  theme: themeConfig,
})
