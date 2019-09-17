<template lang="pug">
    include ./../../../../node_modules/bemto.pug/bemto
    - set_bemto_settings({ modifier: '--' })
    include ./../../../pug/mixins/icon

    +b.component-vue
      |{{title}}
</template>

<script>
/* eslint-disable unicorn/prevent-abbreviations */
export default {
  name: 'ComponentVue',
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
@import '../../../scss/other/variables';
@import '../../../scss/other/mixins';
@import '../../../scss/other/media';
.component-vue {
  font-size: 32px;
  font-weight: bold;
  color: darkgrey;

  $r: &;
}
</style>
