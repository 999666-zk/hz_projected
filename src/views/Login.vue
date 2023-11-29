<template>
  <div id="login" class="fx-aj-c" @click="confirmSta = false">
		<!-- 登录 -->
		<div class="card">
			<img src="@/assets/logo.png" class="logoImg" />
			<div>
				<img class="r-img" src="../assets/loginPic.jpg" />
			</div>
			<div>
				<div class="TypeChoose">
					<div :class="loginType == '0' ? 'LoginType_active fl' : 'LoginType fl'" @click="changeType('0')">{{ $t('common.personal.login') }}</div>
					<div :class="loginType == '1' ? 'LoginType_active fl' : 'LoginType fl'" @click="changeType('1')">{{ $t('common.enterprise.login') }}</div>
				</div>
				<div class="f-c" style="padding: 22px 0 25px 0; font-size: 14px">{{ $t('common.slogan') }}</div>
				<div style="padding:0 30px;padding-bottom: 30px;">
					<ElForm layout="vertical" ref="ruleFormRef" :model="ruleForm" :rules="rules">
						<ElFormItem v-if="loginType == '0'" class="phone" prop="account">
							<div class="inputBar tel-container ">
								<div class="flex-center pointer flagareaC" style="word-break: initial">
									<div @click.stop="confirmSta = !confirmSta" class="flex-center pointer flagareaC">
										<img :src="flag[currentCountry.zoneCode]" style="width:26px;margin-right:2px;vertical-align: 0px;" />
										{{ `+${currentCountry.prefix}` }}
										<a-icon class="mr-10" style="margin-left:5px" type="down" />
									</div>

									<!-- <country-sel-com :confirmSta="confirmSta" :currentId="currentCountry.zoneCode" @changeConfirmE="changeConfirmE" @selectFlag="selectFlag"></country-sel-com> -->
								</div>
								<!-- 输入手机号 -->
								<ElInput :placeholder="$t('sys.tip.input.phone')" v-model="ruleForm.account" />
							</div>
						</ElFormItem>
						<div style="display: flex;" v-if="loginType === '1'">
							<ElFormItem prop="AccountBefore">
								<!-- <ElInput compact class="fx"> -->
								<ElInput
									class="flex1"
									v-model="ruleForm.AccountBefore"
									style="width: 167px; text-align: center;margin-right: 6px;border-radius:4px"
									:placeholder="$t('sys.tip.input.account1')"
								></ElInput>
							</ElFormItem>
							<ElFormItem prop="AccountAfter">
								<ElInput
									class="flex1"
									v-model="ruleForm.AccountAfter"
									style="width: 167px; text-align: center;"
									:placeholder="$t('sys.tip.input.alias1')"
								>
									<span slot="prefix" type="user" style="color:rgba(0,0,0,.25)">@</span>
								</ElInput>
							</ElFormItem>
						</div>
						<ElFormItem style="position: relative" prop="password">
							<!-- 输入密码 -->
							<ElInput
								:type="isPassword ? 'password' : 'text'"
								v-model="ruleForm.password"
								:placeholder="$t('sys.tip.input.password')"
								style="width: 340px; height: 50px;"
								:maxLength="16"
								@keydown.native="keydown($event)"
							></ElInput>
							<a-icon class="passwordIcon" type="eye" @click="changePasswordType" v-if="!isPassword" />
							<a-icon class="passwordIcon" type="eye-invisible" @click="changePasswordType" v-if="isPassword" />
							<router-link to="/forgetPassword" class="abs" style="bottom: -36px; right: 0" v-if="loginType == '0'">{{ $t('common.forgetpassword') }}？</router-link>
						</ElFormItem>
						<ElFormItem style="position: relative" class="flex" prop="imgCode">
							<ElInput
								type="text"
								:placeholder="$t('40017')"
								v-model="ruleForm.imgCode"
								style="width: 209px; height: 50px;"
								:maxLength="4"
								@keydown.native="keydown($event)"
							></ElInput>
							<img :src="codeImg" @click="getCode" class="pointer" style="width: 111px;height: 50px;margin-left: 20px;vertical-align: top;" />
						</ElFormItem>
						<ElFormItem class="fx-aj-c flex-row-center" style="margin-bottom: 20px">
							<ElButton class="btn" @click="handleSubmit"> {{ $t('common.login') }} </ElButton>
						</ElFormItem>
						<div class="fx-aj-c" style="margin-top: 0px">
							{{ $t('common.label.noaccount') }}？
							<router-link to="/register" class="edit" v-if="loginType == '0'">{{ $t('common.gotoregister') }}</router-link>
							<router-link to="/companyRegister" class="edit" v-if="loginType == '1'">{{ $t('common.gotoregister') }}</router-link>
						</div>
					</ElForm>
				</div>
			</div>
		</div>
		<div class="language">
			<div v-for="item in langList" :key="item.name" :class="{ active: lang === item.localLang }" @click="setLanguage(item.localLang)">{{ item.name }}</div>
		</div>
		<!-- 底部信息栏 -->
		<div class="footerInfoBar">{{ $t('sys.reg.s7') }}</div>

		<!-- :footer="null" -->
	</div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus';
import flag from '../assets/flag/index.js'
import { V2Login, V2Login_Enterprise, V2GetImgVerifyCode } from '../api/index';
import { useRoute, useRouter } from 'vue-router';
import { i18n } from '../lang/index'

export default {
  components: {
    ElForm,
    ElFormItem,
    ElButton,
		ElInput,
	},
  setup() {
		const store = useStore();
		const router = useRouter();
		const route = useRoute();
    const confirmSta = ref(false);
		const loginType = ref('0');
		const ruleFormRef = ref();
		const currentTime = ref();
		const codeImg = ref();
		const codekey = ref();
		const ruleForm = reactive({
			account: '',
			password: '',
			imgCode: '',
			AccountBefore: '',
			AccountAfter: '',
		});
		const rules = reactive({
			account: [
				{
					required: true,
					message: i18n.global.t('sys.message.error.empty.phone'),
					trigger: 'blur'
				},
			],
			password: [
				{
					required: true,
					message: i18n.global.t('sys.message.error.empty.password'),
					trigger: 'blur'
				},
			],
			imgCode: [
				{
					required: true,
					message: i18n.global.t('40019'),
					trigger: 'blur'
				}
			],
			AccountBefore: [
				{
					required: true,
					message: i18n.global.t('sys.message.error.account'),
					trigger: 'blur'
				}
			],
			AccountAfter: [
				{
					required: true,
					message: i18n.global.t('sys.message.error.account'),
					trigger: 'blur'
				}
			],
		});
		const currentCountry = reactive({
			country: '中国', icon: 'icon_CNzhongguo', id: 1026, prefix: '86', zoneCode: 'CN'
		})
		// 切换登录方式
	  function changeType(num) {
			console.log(ruleFormRef, 'form');
			ruleFormRef.value.resetFields();
			loginType.value = num
		}
	  async	function getCode() {
			codekey.value = (Math.random() + Math.random() + '').replace('.', '')
			currentTime.value = new Date().getTime()
			const { result } = await V2GetImgVerifyCode(currentTime.value, {})
			// this.codeImg = `data: image/jpeg;base64,${btoa(new Uint8Array(this.codeImg).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`
			codeImg.value = result
			console.log(codeImg.value, '验证码')
		}
		async	function handleSubmit() {
			// e.preventDefault()
			console.log(ruleFormRef.value, '表单实例');
			await ruleFormRef.value.validate(async (valid, fields) => {
				
				if (valid) {
					console.log(ruleForm);
					const { account, password, imgCode, AccountBefore, AccountAfter } = ruleForm;
					if (loginType.value == '0') {
						const { result } = await V2Login({ account, password, checkKey: currentTime.value, captcha: imgCode })
						console.log(result, '登录成功');
						ElMessage.success('登录成功');
						localStorage.setItem('token', result.token)
						localStorage.setItem('userInfo', JSON.stringify(result.userInfo));
						// store.dispatch('user/UserLogin', { ...result.userInfo, token: result.token })
						router.replace('/');
					} else {
						const { result } = await V2Login_Enterprise({
							account: AccountBefore,
							alias: AccountAfter,
							Password: password,
							platform: 1,
							ImgKey: codekey.value,
							ImgCode: imgCode,
							zoneCode: currentCountry.zoneCode,
						})
						store.dispatch('user/UserLogin', result)
					}
				} else {
					console.log('error submit!', fields)
				}
			})
			// ruleFormRef.value.validate(async (err, values) => {
			// 	// ruleFormRef.value.getFieldsError()
			// 	if (!err) {
			// 		// try {
			// 		let { Account, Password, AccountBefore, AccountAfter, ImgCode } = values
			// 		if (loginType.value == '0') {
			// 			console.log('登录', values)
			// 			const { result } = await V2Login({ account: Account, password: Password, checkKey: currentTime.value, captcha: ImgCode })
			// 			console.log(result, '登录成功')
			// 			store.dispatch('user/UserLogin', { ...result.userInfo, token: result.token })
			// 		} else {
			// 			const { data } = await V2Login_Enterprise({
			// 				account: AccountBefore,
			// 				alias: AccountAfter,
			// 				Password,
			// 				platform: 1,
			// 				ImgKey: this.codekey,
			// 				ImgCode,
			// 				zoneCode: this.currentCountry.zoneCode
			// 			})
			// 			store.dispatch('user/UserLogin', data)
			// 		}
			// 		//note:确定是单点登录，登录之后获取我的邮件列表
			// 		let path = route.query.from //from 表示登录后的返回路径
			// 		console.log('path', path)
			// 		if (path === '/' || !path) {
			// 			console.log(1)
			// 			router.push('/email/102')
			// 		} else {
			// 			console.log(2)
			// 			router.push({ path })
			// 		}
			// 		// } catch (error) {
			// 		// console.log(error, '登录报错')
			// 		// this.getCode()
			// 		// }
			// 	}
			// })
		}
		onMounted(() => {
			getCode();
			console.log(i18n, 'i18n', rules);
		})
    return {
			confirmSta,loginType,
			currentCountry,
			flag,
			ruleFormRef,
			codeImg,
			ruleForm,
			rules,
			changeType,
			handleSubmit,
			getCode,
		}
  }
}
</script>

<style lang="less" scoped>
.phone /deep/ .el-form-explain {
	padding-left: 82px;
}
.el-input /deep/ .el-input__wrapper {
	// padding-left: 0;
	// padding-right: 0;
	background-color: #f5f5f5 !important;
}
.el-input__wrapper /deep/ input {
	background-color: none !important;
}
#login {
	width: 100%;
	height: 100%;
}

// logo位置
.logoImg {
	position: absolute;
	width: 218px;
	height: 42px;
	left: 0;
	top: -60px;
}
.fx-aj-c {
	display: flex;
	align-items: center;
	justify-content: center;
}
.card {
	position: relative;
	display: flex;
	justify-content: flex-start;
	width: 800px;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
	border-radius: 9px;
}
.r-img {
	width: 400px;
	height: 100%;
	object-fit: cover;
	font-size: 0;
	border-radius: 9px 0 0 9px;
}

.el-form-item {
	padding-bottom: 0;
	// margin-bottom: 0;
}

/deep/ input {
	height: 50px;
}

.ant-input:hover {
	background-color: #f5f5f5;
}

.btn {
	margin-top: 20px;
	width: 340px;
	height: 50px;
	background: #d93737;
	border-radius: 25px;
	color: #fff;
	border: 0;
}
.TypeChoose {
	width: 400px;
	height: 46px;
	cursor: pointer;
	display: flex;
}
.LoginType {
	width: 200px;
	height: 46px;
	font-size: 18px;
	font-weight: 400;
	color: #333333;
	line-height: 46px;
	text-align: center;
}
// 切换后
.LoginType_active {
	width: 200px;
	height: 46px;
	font-size: 18px;
	font-weight: bold;
	color: #d93737;
	line-height: 46px;
	text-align: center;
	border-bottom: 3px solid #d93737;
}
.infoBar {
	margin-left: 29px;
	margin-top: 10px;
	width: 343px;
	p {
		text-indent: 2em;
		letter-spacing: 1px;
		font-size: 14px;
	}
	span {
		display: inline-block;
		letter-spacing: 1px;
		font-size: 14px;
	}
}
.inputBar {
	position: relative;
	width: 340px;
	height: 50px;
}
.tel-container {
	display: flex;
	align-items: center;
}
/deep/ .flag-list-box {
	background: white !important;
}
// /deep/ .has-error .ant-form-explain,
// /deep/ .has-error .ant-form-split {
// 	margin-left: 30px;
// }
// 底部版权信息等
.footerInfoBar {
	position: fixed;
	bottom: 60px;
}
.passwordIcon {
	position: absolute;
	right: 20px;
	top: 4px;
}
// 语言选择
.language {
	position: fixed;
	display: flex;
	bottom: 96px;
	div {
		color: #333;
		cursor: pointer;
		margin-right: 10px;
	}
	.active {
		color: #037aff;
	}
}
.flex-row-center {
	display: flex;
	justify-content: center;
}
.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
.mr-10 {
	margin-right: 10px;
}
.pointer {
	cursor: pointer;
}
.p-10 {
	padding: 10px;
}
.wrapClass {
	max-height: 70vh;
}
.flagareaC {
	font-size: 14px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.flagC {
	font-size: 28px;
	margin-right: 5px;
}

/deep/ .ant-input {
	border-radius: 4px !important;
}
</style>