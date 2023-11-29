// 收件箱
export const settingAccountOption = {
  align: 'center',
  menuAlign: 'center',
  editBtn: false,
  delBtn: false,
  addBtn: false,
  index: false,
  page:false,
  reserveSelection: false,
  labelWidth: '140',
  arrow: false,
  header: false,
  // menu: false,
  menuWidth: 140,
  // showHeader: false,
  selection: false,
  indexWidth: 20,
  column: [
    {
      label: '账户名称',
      prop: 'account',
      // width: 180,
      // overHidden: true,
      align: 'center',
    },
    {
      label: '邮箱地址',
      prop: 'username',
      overHidden: true,
      align: 'center'
    },
    {
      label: '类型',
      prop: 'acceptProtocol',
      overHidden: true,
      align: 'center',
    },
    {
      label: '状态',
      prop: 'useWay',
      overHidden: true,
      align: 'center',
      slot: true
    },
    {
      label: '消息提醒',
      prop: 'isRemind',
      overHidden: true,
      align: 'center',
      slot: true
    }
  ]
}

export const dicConfig = {
  // 接口地址
  baseURL: process.env.VUE_APP_BASE_API,
  // im接口地址
  // socketURL: process.env.VUE_APP_SOCKET_URL,
  socketURL: process.env.VUE_APP_SOCKET_URL,
  uploadFileServer: process.env.VUE_APP_UPLOAD_FILE_SERVER,
  mailHelpPage: process.env.VUE_APP_MAIL_HELP_PAGE,
}
