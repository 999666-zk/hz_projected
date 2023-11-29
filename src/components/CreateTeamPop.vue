<template>
  <ElDialog
    v-model="isShow"
    :title="$t('common.team.create')"
    :footer="null"
    centered
    :width="400"
    destroyOnClose
    @cancel="close"
  >
    <span style="display: inline-block">{{ $t("common.team.name") }}:</span>
    <ElInput
      type="text"
      v-model="teamName"
      style="height: 32px; width: 100%; margin-top: 8px; margin-bottom: 20px"
      :maxLength="15"
    />
    <div class="fx-j-c">
      <ElButton type="primary" @click="createConfirm" :loading="loading">{{
        $t("common.confirm")
      }}</ElButton>
    </div>
  </ElDialog>
</template>

<script>
import { ElButton, ElDialog, ElInput } from "element-plus";
import { V2CreateTeam } from '../api/index'
export default {
  name: "createTeamPop",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: {
      handler(val) {
        this.isShow = val;
      },
      immediate: true,
    },
  },
  data() {
    return {
      teamName: "",
      isShow: false,
      loading: false,
    };
  },
  methods: {
    async createConfirm() {
      if (this.teamName !== "") {
        try {
          this.loading = true;
          let { data: teamID } = await V2CreateTeam({
            name: this.teamName,
          });
          this.$message.success(this.$t("sys.message.success.team.create"));
          this.teamName = "";
          this.close();
          await this.$store.dispatch("email/getTeamList");
          this.$store.dispatch("system/getAccountInfo"); //获取全局资源

        } finally {
          this.loading = false;
        }
      } else {
        this.$message.error(this.$t("common.team.pleaseEnterRightTeamName"));
      }
    },
    close() {
      this.$emit("close");
    },
  },
  components: { ElDialog, ElInput, ElButton },
};
</script>
