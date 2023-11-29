<template>
  <div class="header">
    <div class="tab flex1 fx-j-c">
			<div class="opt pointer fx-aj-c" :class="{ b: tabPath === o.path }" v-for="(o, i) in tabList" :key="i" @click="tabChange(o)">
				<img v-if="tabPath === o.path" :src="o.src" />
				<img v-else :src="o.srcb" />
			</div>
		</div>
    <CreateTeamPop v-if="visitable" v-model="visitable" @close="close" />
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import home from '@/assets/img/tab/home.png'
import homeB from '@/assets/img/tab/home-b.png'
import email from '@/assets/img/tab/email.png'
import emailB from '@/assets/img/tab/email-b.png'
import file from '@/assets/img/tab/file.png'
import fileB from '@/assets/img/tab/file-b.png'
import { useRoute, useRouter } from 'vue-router';
import CreateTeamPop from './CreateTeamPop.vue';

export default {
  components: { CreateTeamPop },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const visitable = ref(false);
    const teamList = computed(() => store.state.email.teamList);
    const tabPath = computed(() => {
      const path = route.path.split('/')[1];
      return `/${path}`;
    })
    const tabList = ref([
      { src: home, srcb: homeB, path: '/dashboard', query: {} },
			{ src: email, srcb: emailB, path: '/email', cacheName: '', query: {}, params: {} },
			{ src: file, srcb: fileB, path: '/cloud', cacheName: '', query: {}, params: { pg: 'f' } }
    ]);
    function tabChange(item) {
      console.log(item);
      if (item.path === '/email' && teamList.length === 0) {
        visitable.value = true;
        return;
      }
      router.replace(item.path);
    }
    function close() {
      visitable.value = false;
    }
    onMounted(() => {
      console.log(route.path.split('/'), 'route', tabPath);
    });
    return {
      tabList,
      tabPath,
      tabChange,
      close,
      visitable,
    }
  },
};
</script>
<style lang="less" scoped>
.header {
  box-shadow: 0 1px 6px 0 rgba(0,21,41,.12);
  .tab {
    display: flex;
    .opt {
      width: 110px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      // transition: all 0.1s ease-in-out;
      &.b {
        background: #ffebeb;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
.flex1 {
	flex: 1;
}
.fx-j-c {
	justify-content: center;
}
.fx-aj-c {
	align-items: center;
	justify-content: center;
}
.pointer {
	cursor: pointer;
}
</style>