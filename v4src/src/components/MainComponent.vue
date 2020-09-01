<template>
   <div>
    <DefaultWelcome v-if="MySection===''"/>
    <WritingTool v-if="MySection==='manuscript'"/>
    <SettingsTool v-if="MySection==='settings'" />
    <TimelineTool v-if="MySection==='timeline'"  />
    <MindmapTool v-if="MySection==='mindmap'"  />
    <PlanningBoardTool v-if="MySection==='planningboard'"  />
    <ExportTool v-if="MySection==='export'"  />
    <DatabaseTool v-if="MySection==='database'"  />
    <SnowflakeTool v-if="MySection==='snowflake'"  />    
  </div>
</template>
<script>
import DefaultWelcome from './DefaultWelcome/main'
import SettingsTool from './SettingsTool/main'
import WritingTool from './WritingTool/main'
import TimelineTool from './TimelineTool/main'
import SnowflakeTool from './SnowflakeTool/main'
import MindmapTool from './MindmapTool/main'
import PlanningBoardTool from './PlanningBoardTool/main'
import ExportTool from './ExportTool/main'
import DatabaseTool from './DatabaseTool/main'
export default {
  computed : {
    MySection(){
      return this.$root.ProjectState.Section
    }
  },
  components:{
    WritingTool,
    SettingsTool,
    TimelineTool,
    SnowflakeTool,
    MindmapTool,
    PlanningBoardTool,
    ExportTool,
    DatabaseTool,
    DefaultWelcome
  }
}
</script>