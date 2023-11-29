<template>
  <router-view />
</template>
<script>
import { onMounted } from 'vue';
import { loadLanguageAsync } from './lang/index';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch('email/getTeamList');
      store.dispatch('user/getUserInfoForGUID');
      // loadLanguageAsync('zh_CN')
    })
  }
}
</script>
