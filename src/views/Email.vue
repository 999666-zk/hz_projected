<template>
  <div class="email">
    <div class="SideTab scroll">
			<div
				class="opt fx pointer rlt"
				:class="{ s: i === tabIndex }"
				v-for="(o, i) in teamList"
				:key="i"
				@click="tabChange(i, o)"
				:style="{ backgroundColor: i === tabIndex ? 'rgb(217, 55, 55)' : '#fff' }"
			>
				<div class="fx-aj-c flex1 tab_item">
					<ElTooltip placement="right">
						<span>{{ o.teamNameC }}</span>
						<template slot="title">
							{{ o.name }}
						</template>
					</ElTooltip>
				</div>

				<div class="ic" v-if="i !== tabIndex" :style="{ backgroundColor: 'rgb(217, 55, 55)', width: '4px' }"></div>
			</div>
			<div v-if="!isEnterpriseChildUser" class="opt fx-aj-c pointer" :class="{ s: tabIndex === 'add' }" @click="tabChange('add', { teamID: 0 })">
				<img class="add" src="@/assets/img/tab/add.png" />
			</div>
		</div>
    <SideBar />
    <CreateTeamPop v-if="visitable" v-model="visitable" @close="close" />
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import CreateTeamPop from '../components/CreateTeamPop.vue';
import SideBar from './SideBar.vue';

export default {
  components: { CreateTeamPop, SideBar },
  setup() {
    const store = useStore();
    const teamList = computed(() => store.state.email.teamList);
    const tabIndex = ref(0);
    const visitable = ref(false);
    const isEnterpriseChildUser = computed(() => store.getters['user/isEnterpriseMainUser']);
    function tabChange(index, item) {
      console.log(index, item);
      if (index === 'add') {
        visitable.value = true;
        return;
      }
      tabIndex.value = index;
    }
    function close() {
      visitable.value = false;
    }
    onMounted(() => {
      console.log(teamList);
    })
    return {
      teamList,
      tabIndex,
      isEnterpriseChildUser,
      tabChange,
      close,
      visitable,
    }
  }
}
</script>
<style lang="less" scoped>
.tab_item {
  text-align: center;
  line-height: 32px;
}
.view {
  flex-grow: 1;
  height: calc(100vh - 64px);
  overflow: auto;
}
.email {
  // width: 100vw;
  // height: 100vh;
  display: flex;
}
.flex1 {
	flex: 1;
}
.fx-aj-c {
	align-items: center;
	justify-content: center;
}
.fx {
  display: flex;
}
.pointer {
  cursor: pointer;
}
.rlt {
  position: relative;
}
.scroll {
  overflow: auto;
}
.SideTab {
	position: relative;
	z-index: 20;
	width: 86px;
  height: calc(100vh - 64px);
	background: #f0f0f0;
	padding: 20px 0 20px 10px;
	.opt {
		width: 100%;
		height: 32px;
		background: #ffffff;
		border-radius: 100px 0px 0px 100px;
		font-weight: 600;
		color: #444444;
		font-size: 14px;
		opacity: 0.4;
		margin-bottom: 20px;
		white-space: nowrap;
		&.s {
			opacity: 1;
			color: #fff;
		}
	}
}
</style>