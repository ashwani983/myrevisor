import { DataLoader } from './data/loader.js';
import { ConfigStore } from './config/store.js';
import { App } from './app.js';

const app = new App();
app.start().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
