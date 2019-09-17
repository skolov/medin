import Vue from 'vue'
import ComponentVue from '../../../vue/components/component-vue/component-vue.vue'
import store from '../../../vue/store'
import router from '../../../vue/router'

import fetchList from '../../../api/persons'

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('./index.pug')
}

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  require('../../../mock')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    ComponentVue,
  },
  data() {
    return {
      titleText: 'Привет, я VUE',
      persons: null,
      personsload: false,
      storeInput: '',
    }
  },
  computed: {
    titleTextStore() {
      // Данные из AXIOS
      return this.$store.getters.getMessage
    },
  },
  watch: {},
  mounted() {},
  created() {
    // Данные с использованием MOCK
    fetchList()
      .then((response) => {
        this.personsload = true
        this.persons = response.data
      })
      .catch((error) => console.log(error))
  },
  methods: {
    // Пример работы с AXIOS
    newTextStore() {
      this.$store.dispatch('newTextStore', this.storeInput)
    },
  },
})
