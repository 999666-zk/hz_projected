<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="默认邮箱设置" name="first">
        <div class="box">
          <div class="title">邮箱</div>
          <div class="desc">默认邮箱</div>
          <el-select v-model="defaultEmail" @change="handleChangeDefault" class="m-2" placeholder="请选择默认邮箱" size="large">
            <el-option
              v-for="item in emailList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div class="tips">在绑定多个邮箱的情况下，发信时默认选择该邮箱。</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="邮箱管理" name="second">
        <ElButton type="primary" @click="handleAdd">添加邮箱账户</ElButton>
        <ElTable :data="tableData">
          <!-- <el-table-column prop="account" label="账户名称" /> -->
          <el-table-column prop="username" label="邮箱地址" />
          <el-table-column prop="acceptProtocol" label="类型" />
          <el-table-column prop="useWay" label="状态" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="handleDel(scope.row)"
                >删除</el-button
              >
              <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </ElTable>        
      </el-tab-pane>
    </el-tabs>

    <!-- 选择类型  -->
    <el-dialog
      append-to-body
      width="440px"
      :show-close="false"
      v-model="selectTypeDialog"
    >
      <div class="mail-create-container flex-center">
        <h3 class="mail-header-text">添加账户</h3>
        <div class="createForm">
          <div
            class="mail-item flex-center cursor"
            @click="handleSelectItem(item)"
            v-for="(item, index) in mailList"
            :key="'mailList' + index"
          >
            <div class="mailList-item-row">
              <img
                :src="item.img"
                :style="`width: ${item.w};height: ${item.h};`"
                alt=""
              />
              <span class="mail-item-text" v-if="item.text">{{
                item.text
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--  配置  -->
    <el-dialog
      append-to-body
      width="630px"
      v-model="mailConfigDialog"
      :before-close="handleMailConfigDialogCancel"
      :show-close="false"
      :close-on-click-modal="true"
    >
      <div slot="title" class="dialog-header-row" style="position: relative">
        <div class="dialog-tip"></div>
        <span class="el-dialog__title">账户设置</span>
        <!--        <span class="dialog-header-right-text cursor" @click="handleGoToHelp">配置引导说明</span>-->
      </div>
      <mailLoginForm
        :actionMode="actionMode"
        :initData="rowData"
        showUseWay
        :initMailAccountType="mailAccountType"
        @success="successCb"
        v-if="mailConfigDialog"
      />
    </el-dialog>
    <el-dialog
      title="设置签名"
      :before-close="handleClose"
      :visible.sync="showInfo"
      v-if="showInfo"
    >
      <!-- 个性签名组件 -->
      <!-- <signature></signature> -->
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { settingAccountOption } from "../utils/config";
// import { getMailConfigList, delConfigById, updateConfigState ,businessRemind } from "@/api/mail"
import mailLoginForm from './components/maillLoginForm/index.vue';
import { getMailConfigList, delConfigById, updateConfigState, getDefaultMailConfig } from '../api/index';
import _store from 'store2';
// import EventBus from '@/eventBus'
export default {
  name: "settingAccount",
  components: {
    mailLoginForm,
  },
  data() {
    return {
      tableData: [],
      emailList: [],
      defaultEmail: '',
      activeName: 'first',
      tableOption: settingAccountOption,
      tableLoading: true,
      dialog: false,
      rowData: {}, // 行数据
      knowTaskId: "", // 处理id
      mailConfigDialog: false,
      selectTypeDialog: false,
      actionMode: "add", // [add, edit]
      mailAccountType: "other",
      mailList: [
        // {img: require('@/assets/img/mail/jck.png'),  w: '26px', h: '30px', type: 'jck', text: '进出口邮箱'},
        {
          img: require("@/assets/img/mail/tx.png"),
          w: "29px",
          h: "20px",
          type: "tengXunQiYe",
          text: "腾讯企业邮",
        },
        {
          img: require("@/assets/img/mail/qq.png"),
          w: "29px",
          h: "29px",
          type: "tengXunQQ",
          text: "QQ邮箱",
        },
        {
          img: require("@/assets/img/mail/163.png"),
          w: "29px",
          h: "15px",
          type: "wangYi",
          text: "163邮箱",
        },
        {
          img: require("../assets/img/mail/126.png"),
          w: "29px",
          h: "16px",
          type: "126",
          text: "126邮箱",
        },
        // {img: require('@/assets/img/mail/gmail.png'),  w: '29px', h: '22px', type: 'gmail', text: 'Gmail'},
        // {img: require('@/assets/img/mail/outlook.png'),  w: '29px', h: '25px', type: 'outlook', text: 'Outlook'},
        // {img: require('@/assets/img/mail/exchange.png'),  w: '29px', h: '27px', type: 'exchange', text: 'Exchange'},
        {
          img: require("@/assets/img/mail/mail.png"),
          w: "29px",
          h: "26px",
          type: "other",
          text: "其他邮箱",
        },
      ],
      showInfo: false,
      remindStatus: false,
    };
  },
  mounted() {
    this.getList();
    this.getDefaultMailConfig();
    console.log('渲染完成');
  },
  methods: {
    async handleChangeDefault(id) {
      const result = await updateConfigState({ id, isBind: 1 });
      if (result.code !== 0) {
        this.defaultEmail = '';
        ElMessage.error('设置失败');
        return;
      }
      ElMessage.success('设置成功');
    },
    async getDefaultMailConfig() {
      const result = await getDefaultMailConfig();
      console.log('获取默认邮箱', result);
      if (result.code !== 0) {
        ElMessage.error(result.msg);
        return;
      }
      const { id } = result.data;
      this.defaultEmail = id;
    },
    //个性签名弹框关闭
    handleClose() {
      this.showInfo = false;
    },
    // 邮箱邮箱
    // TODO:
    getList() {
      this.tableLoading = true;
      // const res = {
      //   data: {"code":200,"msg":"成功","data":[{"id":71,"sysUserId":419,"mailType":"wangYi","account":"Beats0","sendHost":"smtp.163.com","acceptHost":"imap.163.com","sendPort":465,"acceptPort":993,"acceptSsl":1,"sendSsl":1,"username":"jyl2047155291@163.com","password":"xxx","sendProtocol":"smtp","acceptProtocol":"imap","defaultEncodingS":"UTF-8","useWay":1,"createTime":"2021-04-03T22:21:00","updateTime":"2021-04-03T22:21:00","delFlag":0,"tenantId":39},{"id":110,"sysUserId":419,"mailType":"tengXunQQ","account":"","sendHost":"smtp.qq.com","acceptHost":"imap.qq.com","sendPort":465,"acceptPort":993,"acceptSsl":1,"sendSsl":1,"username":"1357097581@qq.com","password":"xxppeerzfmrebagg","sendProtocol":"smtp","acceptProtocol":"imap","defaultEncodingS":"UTF-8","useWay":1,"createTime":"2021-06-09T09:26:32","updateTime":"2021-06-09T09:26:32","delFlag":0,"tenantId":39}],"timestamp":"2021-06-09 14:28:06 870"}
      // }
      console.log('用户信息', _store.get('userInfo'));
      getMailConfigList()
        .then((res) => {
          console.log(res.data, '邮箱列表');
          const list = res.data || [];
          this.tableData = list;
          this.emailList = list.map(item => ({ label: item.username, value: item.id }));
          // if (res.data.code === 0) {
          //   this.tableData = res.data.data;
          //   // console.log(this.tableData)
          // }
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    successCb() {
      this.mailConfigDialog = false;
      this.getList();
      console.log('添加成功');
      // EventBus.$emit('handleCheckIsFirstLogin')
    },
    // 选中item
    handleSelectItem(item) {
      this.mailAccountType = item.type;
      this.actionMode = "add";
      this.rowData = {};
      this.selectTypeDialog = false;
      this.mailConfigDialog = true;
    },
    // 帮助
    handleGoToHelp() {
      // const url = process.env.NODE_ENV === 'development'?location.protocol+'//'+location.host+':8081':''
      // console.log(location,"99999999999")
      // openLink(location.origin+'/html/mailhelp.html')
    },
    handleMailConfigDialogCancel() {
      this.mailConfigDialog = false;
    },
    // 开启、关闭
    handleChange(status, row) {
      const query = {
        id: row.id,
        useWay: row.useWay,
      };
      updateConfigState(query).then((res) => {
        if (res.data.code === 0) {
          this.getList();
        }
      });
    },
    // 删除
    handleDel({ id }) {
      console.log('删除', id);
      this.$msgbox({
        title: "提示",
        message: `
          <div class="msgBoxInner">
            <div class="innerHeader">
              <i class="innerIcon el-icon-info warning-icon"></i>
              <span class="innerTitle">确定将邮箱账号删除吗？</span>
            </div>
          </div>
          `,
        dangerouslyUseHTMLString: true,
        customClass: "customMsgBox",
        showCancelButton: true,
        confirmButtonText: "确定",
        confirmButtonClass: "confirmBtn confirmButton",
        cancelButtonText: "取消",
        cancelButtonClass: "confirmBtn cancelButton",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            delConfigById({ id })
              .then((res) => {
                console.log('删除成功', res);
                if (res.code === 0) {
                  this.$message.success("删除成功");
                  // EventBus.$emit('handleCheckIsFirstLogin')
                  this.getList();
                }
              })
              .finally(() => {
                done();
                instance.confirmButtonLoading = false;
              });
          } else {
            done();
          }
        },
      })
        .then((action) => {})
        .catch((e) => {});
    },
    // 编辑
    handleEdit(row) {
      this.actionMode = "edit";
      this.rowData = row;
      this.mailConfigDialog = true;
    },
    // 新增
    handleAdd() {
      this.mailAccountType = "tengXunQiYe";
      this.selectTypeDialog = true
      this.actionMode = "add";
      this.rowData = {};
      // this.mailConfigDialog = true;
    },
    //个性签名弹框打开
    handleSignature() {
      this.showInfo = true;
    },
    //开启关闭消息提醒
    handleremindStatus(row) {
      console.log(row);
      businessRemind(row.id, row.isRemind).then((res) => {
        if (res.data.code === 0) {
          this.getList();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  padding: 20px;
  .title {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .desc {
    margin-bottom: 8px;
  }
  .tips {
    margin-top: 10px;
    height: 20px;
    line-height: 20px;
    color: #999;
    font-weight: 400;
  }
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cursor {
  cursor: pointer;
}
.mail-create-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  .mail-header-text {
    color: rgb(0, 140, 255);
    text-align: center;
    letter-spacing: 3px;
    font-size: 18px;
    margin-bottom: 35px;
  }
  .createForm {
    width: 240px;
    .mail-item {
      width: 240px;
      height: 44px;
      background: #F0F3F9;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    .mailList-item-row {
      display: flex;
      align-items: center;
      min-width: 115px;

      .mail-item-text {
        font-size: 14px;
        font-weight: 500;
        color: #222222;
        margin-left: 15px;
      }
    }
  }
}
</style>
