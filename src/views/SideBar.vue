<template>
  <div class="slid_bar">
    <div class="set_up">
      <el-button type="primary" round @click="handleToWrite" :icon="Edit">写邮件</el-button>
      <el-button round :loading="loading" @click="handleNewMail" :icon="Message">收邮件</el-button>
    </div>
    <ElMenu
      default-active="/email/inbox"
      class="el-menu-vertical-demo"
      :router="true"
    >
      <ElMenuItem index="/email/inbox">
        <img class="in" src="@/assets/statusbar/sb1y.png" />
        <!-- <el-icon></el-icon> -->
        <span>收件箱</span>
      </ElMenuItem>
      <ElMenuItem index="/email/has_send">
        <img class="in" src="@/assets/statusbar/sb2y.png" />
        <span>{{ $t('common.has.sent') }}</span>
      </ElMenuItem>
      <ElMenuItem index="/email/draft">
        <img class="in" src="@/assets/statusbar/sb2y.png" />
        <span>{{ $t('common.draftsbox') }}</span>
      </ElMenuItem>
      <ElMenuItem index="/email/waste">
        <img class="in" src="@/assets/statusbar/sb3y.png" />
        <!-- <el-icon></el-icon> -->
        <span>垃圾箱</span>
      </ElMenuItem>
      <!-- <ElSubMenu index="1">
        <template #title>
          <span>Navigator</span>
        </template>
        <ElMenuItemGroup title="Group One">
          <ElMenuItem index="1-1">item one</ElMenuItem>
          <ElMenuItem index="1-2">item two</ElMenuItem>
        </ElMenuItemGroup>
        <ElMenuItemGroup title="Group Two">
          <ElMenuItem index="1-3">item three</ElMenuItem>
        </ElMenuItemGroup>
        <ElSubMenu index="1-4">
          <template #title>item four</template>
          <ElMenuItem index="1-4-1">item one</ElMenuItem>
        </ElSubMenu>
      </ElSubMenu> -->
      <ElSubMenu index="/email">
        <template #title>
          <el-icon color="#409eff"><setting color="#409eff" /></el-icon>
          <span>设置</span>
        </template>
        <ElMenuItem index="/email/account_setting">邮箱设置</ElMenuItem>
      </ElSubMenu>
    </ElMenu>
  </div>
</template>
<script>
import { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubMenu } from 'element-plus';
import {
  Document,
  Edit,
  Menu as IconMenu,
  Location,
  Message,
  Setting,
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getMailByDay, getDefaultMailConfig } from '../api/index';

export default {
    setup() {
      const router = useRouter();
      const loading = ref(false);
      // const id = ref('');
      function handleOpen(key, keyPath) {
        console.log(key, keyPath)
      }
      function handleClose(key, keyPath) {
        console.log(key, keyPath)
      }
      function handleToWrite() {
        router.push('/email/write_mail');
      }
      async function getMailConfig() {
        console.log('导航组件获取start');
        // console.log(result, '导航组件获取')
        // if (result.code !== 0) {
        //   ElMessage.error(result.msg);
        //   return;
        // }
        // id.value = mailId;
      }
      async function handleNewMail() {
        loading.value = true;
        const resultConfig = await getDefaultMailConfig();
        const { id: mailId } = resultConfig.data;
        const result = await getMailByDay({ id: mailId });
        console.log('收邮件', result);
        loading.value = false;
      }
      onMounted(() => {
        console.log(Edit);
        getMailConfig();
      })
      return {
        loading,
        handleOpen,
        handleClose,
        handleToWrite,
        handleNewMail
      }
    },
    components: { ElMenu, IconMenu, Document, Location, Setting, ElSubMenu, ElMenuItemGroup, ElMenuItem, Edit, Message }
}
</script>
<style lang="less" scoped>
.slid_bar {
  width: 138px;
  &/deep/.el-menu-item.is-active {
    background-color: #e6f7ff;
  }
  .set_up {
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-button+.el-button {
      margin-left: 0;
      margin-top: 12px;
    }
  }
}

.in {
	width: 16px;
	height: 16px;
	margin-right: 10px;
}
</style>