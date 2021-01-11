import Dexie from 'dexie';
import 'dexie-observable';

const db = new Dexie('wavemaker');
db.version(1).stores({
    Settings : `$$uuid, settings, lastupdated`,
    Writer : `$$uuid,title, author, files, lastupdated`,
    Cards: `$$uuid,title,content,lastupdated`,
    Snowflake : `$$uuid,title,content,lastupdated`,
    Timeline : `$$uuid,title,content,lastupdated`,
    Gridplanner : `$$uuid,title,content,lastupdated`,
    Mindmap : `$$uuid,title,content,lastupdated`,
});
/* 
The observable elements are set up in main.js
*/
export default db;