export default {
	userInfo: state => state.user.userInfo,
	token: state => state.user.token,
	loginStatus: state => state.user.loginStatus, //登录状态
	UserEmailList: state => state.user.UserEmailList, //我的用户列表
	curUseMyEmail: state => state.user.userInfo.userID == state.email.selectMember_Admin //管理模式下 当前显示分组成员为我自己的账号
}
