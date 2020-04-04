import Vue from 'vue'
import Router from 'vue-router'
import Job from '@/Job.vue'
import Record from '@/components/Record'
import user from '@/view/user'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app',
      component: user,
      redirect:'/quartz/user/login',
      
    },
    {
      path: '/',
      name: 'app',
      component: Job,
      children: [
        {
          path: '/quartz/main',
          component:()=> import('../components/Main.vue')
        },
        {
          path: '/quartz/task/add',
          component:()=> import('../components/AddJob.vue')
        },
        {
          path: '/quartz/task/list',
          component:()=> import('../components/JobsForm.vue')
        },
        {
          path: '/quartz/record/list',
          component: Record
        },
      ]
    },
    {
      path:"/quartz/user",
      component:()=>import('../view/user.vue'),
      children:[
        {
          path: '/quartz/user/login',
          component:()=>import('../view/login.vue')
        },
        {
          path: '/quartz/user/register',
          component:()=>import('../view/register.vue')
        }
      ]
    },
    {
      path:'/quartz/user/profile',
      component:()=>import('../view/profile.vue')
    }

  ]
})
