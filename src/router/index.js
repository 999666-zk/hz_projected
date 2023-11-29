import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
			title: '',
			langKey: 'common.login',
			noAuth: true
		},
		component: () => import('../views/Login.vue')
  },
  
  {
    path: '/',
    component: () => import('../layout/index.vue'),
		meta: { icon: 'dashboard', title: '', langKey: 'common.dashboard', signTab: true, uninclude: ['dir'] },
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
				name: 'Dashboard',
				meta: { title: '', langKey: 'common.dashboard' },
				component: () => import('../views/Dashboard.vue')
      },
      {
        path: 'email',
        name: 'Email',
        meta: { title: '' },
        component: () => import('../views/Email.vue'),
        redirect: '/email/inbox',
        children: [
          {
            path: 'account_setting',
            name: 'AccountSetting',
            component: () => import('../views/AccountSetting'),
          },
          {
            path: 'write_mail',
            name: 'WriteMail',
            component: () => import('../views/WriteMail.vue'),
          },
          {
            path: 'inbox',
            name: 'Inbox',
            component: () => import('../views/Inbox.vue')
          },
          {
            path: 'has_send',
            name: 'HasSend',
            component: () => import('../views/HasSend.vue'),
          },
          {
            path: 'draft',
            name: 'Draft',
            component: () => import('../views/Draft.vue')
          },
          {
            path: 'waste',
            name: 'Waste',
            component: () => import('../views/Waste.vue'),
          }
        ]
      },
      {
        path: 'cloud',
        name: 'Cloud',
        component: () => import('../views/Cloud.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
