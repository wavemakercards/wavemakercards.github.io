import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../tools/welcome/Welcome.vue'
import Writer from '../tools/writer/Writer.vue'
import WriterItem from '../tools/writer/WriterItem.vue'
import Setup from '../tools/setup/Setup.vue'
import Project from '../tools/project/Project.vue'
import Snowflake from '../tools/snowflake/Snowflake.vue'
import SnowflakeItem from '../tools/snowflake/SnowflakeItem.vue'
import Database from '../tools/database/Database.vue'
import Timeline from '../tools/timeline/Timeline.vue'
import TimelineItem from '../tools/timeline/TimelineItem.vue'
import PlanningboardItem from '../tools/planningboard/PlanningboardItem.vue'
import Gridplanner from '../tools/gridplanner/Gridplanner.vue'
import GridplannerItem from '../tools/gridplanner/GridplannerItem.vue'
import Mindmap from '../tools/mindmap/Mindmap.vue'
import MindmapItem from '../tools/mindmap/MindmapItem.vue'
import Settings from '../tools/settings/Settings.vue'
import Exportoptions from '../tools/exportoptions/Exportoptions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/setup',
    name: 'Setup',
    component: Setup
  },
  {
    path: '/project',
    name: 'Project',
    component: Project
  },
  {
    path: '/writer',
    name: 'Writer',
    component: Writer
  },
  {
    path: '/writer/:id',
    name: 'WriterItem',
    component: WriterItem
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: Timeline
  },
  {
    path: '/timeline/:id',
    name: 'TimelineItem',
    component: TimelineItem
  },
  {
    path: '/snowflake',
    name: 'Snowflake',
    component: Snowflake
  },
  {
    path: '/snowflake/:id',
    name: 'SnowflakeItem',
    component: SnowflakeItem
  },
  {
    path: '/database',
    name: 'Database',
    component: Database
  },
  {
    path: '/planningboard',
    name: 'Writer',
    component: Writer
  },
  {
    path: '/planningboard/:id',
    name: 'PlanningboardItem',
    component: PlanningboardItem
  },
  {
    path: '/gridplanner',
    name: 'Gridplanner',
    component: Gridplanner
  },
  {
    path: '/gridplanner/:id',
    name: 'GridplannerItem',
    component: GridplannerItem
  },

  {
    path: '/mindmap',
    name: 'Mindmap',
    component: Mindmap
  },
  {
    path: '/mindmap/:id',
    name: 'MindmapItem',
    component: MindmapItem
  },
  {
    path: '/exportoptions',
    name: 'Exportoptions',
    component: Exportoptions
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
 // mode: 'history',  // using hash mode for dev comment this out
  base: process.env.BASE_URL,
  routes
})

export default router
