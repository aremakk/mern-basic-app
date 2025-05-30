// cache.js
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 60 }); // TTL = 60 секунд
export default cache;
