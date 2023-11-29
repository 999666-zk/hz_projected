<template>
  <div class="wrap">
    <div class="inbox">
      <div class="bg_w">
        <span class="span">选择邮箱：</span>
        <el-select v-model="configId" @change="handleChangeDefault" class="m-2" placeholder="请选择默认邮箱">
          <el-option
            v-for="item in emailList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-input
          v-model="searchCount"
          placeholder="请输入邮箱/主题搜索"
          class="input-with-select"
        >
          <template #append>
            <ElButton type="primary">搜索</ElButton>
          </template>
        </el-input>
      </div>
      <div class="screen">
        <div class="screen_btn">
          <template v-if="type === 1 || type === 3">
            <ElButton size="small" @click="requestTagAllRead">全部已读</ElButton>
            <ElButton size="small" @click="() => handleCommand('0')">设为已读</ElButton>
            <ElButton size="small" @click="requestDelMail">删除</ElButton>
            <ElButton size="small" v-if="type === 1">垃圾邮件</ElButton>
          </template>
          <ElButton size="small" v-if="type === 2" @click="requestDelMail">删除草稿</ElButton>
          <ElButton size="small" v-if="type === 1">拉黑</ElButton>
          <template v-if="type === 5">
            <ElButton size="small" @click="requestTagAllRead">全部已读</ElButton>
            <ElButton size="small" @click="() => requestDelMail(2)">彻底删除</ElButton>
            <ElButton size="small">拉黑</ElButton>
            <ElButton size="small" @click="() => requestDelMail(0)">还原</ElButton>
          </template>
          <ElDropdown size="small" @command="handleCommand">
            <el-button size="small">
              标记为...
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <!--  0 已读  1 未读  2 红旗 3 取消红旗 -->
                <el-dropdown-item command="0">已读邮件</el-dropdown-item>
                <el-dropdown-item command="1">未读邮件</el-dropdown-item>
                <el-dropdown-item command="2">星标邮件</el-dropdown-item>
                <el-dropdown-item command="3">取消星标</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </ElDropdown>
        </div>
        <el-pagination
          v-model:current-page="current"
          v-model:page-size="size"
          small="small"
          v-if="total"
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <ElTable v-loading="loading" :data="tableData" @selection-change="handleSelectionChange" size="small" height="262" highlight-current-row @current-change="handleCurrentRowChange">
        <!-- <el-table-column prop="account" label="账户名称" /> -->
        <el-table-column type="selection" />
        <el-table-column width="30">
          <template #header>
            <img src="@/assets/email/hp.svg" />
          </template>
          <template #default="scope">
            <img v-if="scope.stress" @click.stop="() => handleSettingStress(scope, '2')" class="pointer" src="@/assets/email/hp.svg" />
            <img v-else class="pointer" @click.stop="() => handleSettingStress(scope, '3')" src="@/assets/email/hp1.svg" />
          </template>
        </el-table-column>
        <el-table-column width="30">
          <template #header>
            <img src="@/assets/email/weidu.svg" />
          </template>
          <template #default="scope">
            <img v-if="scope.rend" class="pointer" src="@/assets/email/yidu.svg" />
            <img v-else class="pointer" src="@/assets/email/weidu.svg" />
          </template>
        </el-table-column>
        <el-table-column width="30">
          <template #header>
            <img src="@/assets/email/fj.svg" />
          </template>
          <template #default="scope">
            <img v-if="scope.isExtend" class="pointer" src="@/assets/email/fj.svg" />
          </template>
        </el-table-column>
        <el-table-column prop="from" label="发件人" />
        <el-table-column prop="subject" label="主题" />
        <el-table-column prop="sentDate" label="日期" />
        <el-table-column prop="remark" label="备注"/>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="handleDel(scope.row)"
              >回复</el-button
            >
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </ElTable>
      <div class="current_mail">
        <div class="mail_info">
          <div class="from">发件人：{{currentMail.from}}</div>
          <div class="to">收件人：{{currentMail.to}}</div>
          <div class="to">抄送：{{currentMail.to}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, watch } from 'vue';
import { getMail, getDefaultMailConfig, getMailConfigList, tagMail, tagAllRead, delMail, getMailDetails } from '../../api/index';
import { ElMessage } from 'element-plus';
export default {
  // (-1:失败邮件,1:收件箱,2:草稿箱,3:已发送,4:已删除,5:垃圾邮件)
  props: ['type'],
  setup(props) {
    const configId  = ref('');
    const emailList = ref([]);
    const searchCount = ref('');
    const current = ref(1);
    const size = ref(20);
    const total = ref(0);
    const tableData = ref([]);
    const loading = ref(false);
    const multipleTableRef = ref(null);
    const multipleSelection = ref([]);
    const currentMail = ref({});
    async function getConfig() {
      const resultConfig = await getDefaultMailConfig();
      const { id } = resultConfig.data;
      // configId.value = id;
      console.log(id);
    }
    function getMailListConf() {
      getMailConfigList()
        .then((res) => {
          console.log(res.data, '邮箱配置列表');
          const list = res.data || [];
          emailList.value = list.map(item => ({ label: item.username, value: item.id }));
          // if (res.data.code === 0) {
          //   this.tableData = res.data.data;
          //   // console.log(this.tableData)
          // }
        });
    }
    function handleSizeChange() {}
    function handleCurrentChange(page) {
      console.log(page);
      current.value = page;
      getMailList();
    }
    async function getMailList() {
      loading.value = true;
      const result = await getMail({
        configId: configId.value,
        current: current.value,
        groupId: props.type || 1, // `group_id` char(50) DEFAULT NULL COMMENT '邮件类型(-1:失败邮件,1:收件箱,2:草稿箱,3:已发送,4:已删除,5:垃圾邮件)',
        hitCount: '',
        maxLimit: '',
        orders: [],
        records: [],
        searchCount: searchCount.value,
        size: size.value,
        stress: '',
        subject: '',
      });
      loading.value = false;
      const { records, total: newTotal } = result.data.page;
      total.value = newTotal;
      tableData.value = records;
      console.log(records, '列表');
    }
    function handleSelectionChange(val) {
      multipleSelection.value = val;
      console.log(val, 'handleSelectionChange');
    }
    async function requestTagMail(tag) {
      const result = await tagMail({
        status: tag,
        remark: '',
        mailIds: multipleSelection.value.map(item => item.id).join(','),
      });
      console.log('标记邮件', result);
      if (result.code !== 0) {
        ElMessage.error(result.message);
        return;
      }
      getMailList();
    }
    async function requestTagAllRead() {
      const result = await tagAllRead();
      getMailList();
    }
    async function requestDelMail(flag) {
      if (!multipleSelection.value.length) {
        ElMessage.error('未选中任何邮件');
        return;
      }
      const result = await delMail({
        configId: configId.value,
        delFlag: flag === undefined ? 1 : flag, // 0 还原  1 已删除 2彻底删除
        mailIds: multipleSelection.value.map(item => item.id).join(','),
      });
      if (result.code !== 0) {
        ElMessage.error(result.msg);
        return;
      }
      ElMessage.success('删除成功');
      setTimeout(() => {
        getMailList();
      }, 1500);
    }
    async function handleCurrentRowChange(current) {
      console.log(current);
      const result = await getMailDetails({ id: current.id });
      currentMail.value = current;
      if (result.code !== 0) {
        ElMessage.error(result.message);
        return;
      }
      console.log(current, '详情');
    }

    function handleCommand(val) {
      console.log(val, multipleSelection.value);
      if (!multipleSelection.value.length) {
        ElMessage.error('未选中任何邮件');
        return;
      }
      requestTagMail(val);
    }
    function handleSettingStress(scope, type) {
      console.log(scope.row, type);
      multipleSelection.value = [scope.row];
      handleCommand(type);
    }
    onMounted(async () => {
      console.log('组件', props.type, multipleTableRef.value);
      await getConfig();
      getMailList();
      getMailListConf();
    })
    return {
      configId,
      emailList,
      tableData,
      current,
      size,
      total,
      loading,
      multipleTableRef,
      handleCommand,
      currentMail,
      handleSizeChange,
      handleCurrentChange,
      handleCurrentRowChange,
      handleSettingStress,
      handleSelectionChange,
      requestTagAllRead,
      requestDelMail,
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  background-color: rgb(245, 245, 245);
  padding: 8px;
}
.pointer {
  cursor: pointer;
}
.inbox {
  background-color: #fff;
}
.bg_w {
  padding: 8px;
  .span {
    font-size: 14px;
    color: rgba(0,0,0,.65);
  }
}
.input-with-select {
  width: 350px;
}
.screen {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  background-color: #f5f5f5;
  .el-button+.el-button {
    margin-left: 2px;
  }
  .el-dropdown {
    margin-left: 2px;
  }
}
.current_mail {
  background: rgb(229, 229, 229);
  padding: 0px 20px;
  .mail_info {
    display: flex;
    height: 30px;
    align-items: center;
    div {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
  }
}
</style>