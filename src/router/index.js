import Vue from 'vue'
import Router from 'vue-router'
import JobsForm from '@/components/JobsForm'
import Main from '@/components/Main'
import AddJob from '@/components/AddJob'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app',
      component: app,
    }, 
    {
      path: '/1',
      name: '1',
      component: Main
        },
    {
      path: '/quartz/task/add',
      name: 'add',
      component: AddJob
        },
    {
      path: '/2-2',
      name: '2-1',
      component: JobsForm
        },
  ]
})
