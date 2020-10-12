import Dexie from 'dexie';
import 'dexie-observable';

const db = new Dexie('wm4');
db.version(1).stores({
    ProjectInfo: `id,state,lastupdated`,
    ManuscriptData: `id,state,lastupdated`,
    CardsDatabase : `uuid,hashtags,meta,body,lastupdated`,
 /*   AppState: `id,state,lastupdated`,
    ProjectState: `id,state,lastupdated`,
    FileCards: `uuid,title,hashtags,body,meta,lastupdated`,
    PlanningBoards: `uuid,title,data,lastupdated`,
    Snowflakes: `uuid,title,data,lastupdated`,
    Timelines: `uuid,title,data,lastupdated`,
    Mindmaps: `uuid,title,data,lastupdated`,
    */
});
/* 
The observable elements are set up in main.js
*/
export default db;