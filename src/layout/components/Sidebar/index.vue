<template>
  <div class="sidebar-container">
    <div class="logo" @click="$router.push('/')">
      <img class="logo-img" :src="require('../../../assets/img/logo.png')" alt="logo" />
      <transition name="el-zoom-in-center">
        <h1 v-show="opened" class="logo-text">Vue Element Admin</h1>
      </transition>
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :router="true"
        :default-active="$route.path"
        :collapse="isCollapse"
        :show-timeout="200"
        text-color="#fff"
        background-color="#4a5a74"
        active-text-color="#409EFF"
      >
        <SidebarItem v-for="item in routerList" :key="item.path" :index="item.path" :nav="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { constantRoutes as routes } from '@/router'
import { getRoles } from '@/utils/auth'
import SidebarItem from './SidebarItem.vue'

const roles = getRoles()
const store = useStore()
const routerList = reactive([])

const opened = computed(() => store.state.app.sidebar.opened)
const isCollapse = computed(() => !opened.value)



onMounted(() => {
  console.log(routerList, '路由列表', routes, roles);
  filterRoutes()
})

function formatPath(list) {
  if (!list) {
    return;
  }
  return list.map(item => {
    item.path = item.path.replace('/:id', '');
    if (item.children) {
      item.children = formatPath(item.children);
    }
    return item;
  });
}
console.log(formatPath(routes));
const constantRoutes = formatPath(routes);
// const constantRoutes = routes.map(route => {
//   route
// });

/**
 * 权限过滤路由
 */
const filterRoutes = () => {
  constantRoutes.forEach((item) => {
    if (item.path === '/') {
      routerList.push(...item.children)
    }
  })
  for (let i = 0; i < routerList.length; i++) {
    if (
      routerList[i].meta &&
      routerList[i].meta.roles &&
      !routerList[i].meta.roles.includes(roles)
    ) {
      routerList.splice(i, 1)
      i--
    }
  }
  filterChildren(routerList)
}

/**
 * 权限过滤子路由
 */
const filterChildren = (routers) => {
  const children = []
  routers.forEach((item) => {
    if (
      (item.meta && !item.meta.roles) ||
      (item.meta && item.meta.roles && item.meta.roles.includes(roles))
    ) {
      children.push(item)
      if (item.children) {
        filterChildren(item.children)
      }
    }
  })
  routers.length = 0
  routers.push(...children)
}
</script>

<style lang="less" scoped="scoped">
.logo {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  overflow: hidden;
  text-align: center;
  cursor: pointer;
  background-color: #2b2f3a;

  .logo-img {
    width: 32px;
    height: 32px;
  }

  .logo-text {
    display: inline-block;
    height: 50px;
    margin-left: 12px;
    font-size: 14px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
