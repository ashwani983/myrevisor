import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_URL =
  'https://raw.githubusercontent.com/ashwani983/myrevisor/main/src/data/versions.json';

export class DataSync {
  constructor() {
    this.dataDir = path.join(__dirname, '..', 'data');
    this.localVersions = this.loadLocalVersions();
  }

  loadLocalVersions() {
    const versionsFile = path.join(this.dataDir, 'versions.json');
    try {
      if (fs.existsSync(versionsFile)) {
        return JSON.parse(fs.readFileSync(versionsFile, 'utf-8'));
      }
    } catch (error) {
      console.error('Error loading local versions:', error.message);
    }
    return null;
  }

  saveLocalVersions(data) {
    const versionsFile = path.join(this.dataDir, 'versions.json');
    fs.writeFileSync(versionsFile, JSON.stringify(data, null, 2));
  }

  async fetchRemoteVersions() {
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch remote versions: ${error.message}`);
    }
  }

  async downloadFile(url, localPath) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const content = await response.text();

      const dir = path.dirname(localPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(localPath, content);
      return true;
    } catch (error) {
      throw new Error(`Failed to download ${url}: ${error.message}`);
    }
  }

  compareVersions(local, remote) {
    const updates = [];

    if (!local || !local.dataFiles) {
      return Object.keys(remote.dataFiles).map(key => ({
        name: key,
        status: 'new',
        remote: remote.dataFiles[key],
      }));
    }

    for (const [name, remoteInfo] of Object.entries(remote.dataFiles)) {
      const localInfo = local.dataFiles[name];

      if (!localInfo) {
        updates.push({ name, status: 'new', remote: remoteInfo });
      } else if (remoteInfo.lastUpdated !== localInfo.lastUpdated) {
        updates.push({
          name,
          status: 'updated',
          local: localInfo,
          remote: remoteInfo,
        });
      }
    }

    return updates;
  }

  async checkForUpdates() {
    console.log('\n🔍 Checking for data updates...\n');

    try {
      const remoteVersions = await this.fetchRemoteVersions();
      const updates = this.compareVersions(this.localVersions, remoteVersions);

      if (updates.length === 0) {
        console.log('✅ All data files are up to date!');
        return { hasUpdates: false, updates: [] };
      }

      console.log(`📦 Found ${updates.length} update(s):\n`);

      updates.forEach(update => {
        if (update.status === 'new') {
          console.log(
            `  🆕 ${update.name}: New (${update.remote.questionCount} questions)`
          );
        } else {
          console.log(`  🔄 ${update.name}: Updated`);
          console.log(
            `     Local: ${update.local.lastUpdated} (${update.local.questionCount} questions)`
          );
          console.log(
            `     Remote: ${update.remote.lastUpdated} (${update.remote.questionCount} questions)`
          );
        }
      });

      return { hasUpdates: true, updates, remoteVersions };
    } catch (error) {
      console.error('❌ Failed to check for updates:', error.message);
      return { hasUpdates: false, updates: [], error: error.message };
    }
  }

  async sync(force = false) {
    const { hasUpdates, updates, remoteVersions } =
      await this.checkForUpdates();

    if (!hasUpdates && !force) {
      return { success: true, synced: 0 };
    }

    if (force || hasUpdates) {
      console.log('\n📥 Downloading updates...\n');

      let synced = 0;
      const filesToSync = force
        ? Object.entries(remoteVersions.dataFiles)
        : updates.map(u => [u.name, u.remote]);

      for (const [name, info] of filesToSync) {
        try {
          const localPath = path.join(this.dataDir, info.file);
          process.stdout.write(`  Downloading ${info.file}... `);

          await this.downloadFile(info.url, localPath);
          console.log('✅');
          synced++;
        } catch (error) {
          console.log('❌');
          console.error(`     Error: ${error.message}`);
        }
      }

      if (remoteVersions) {
        this.saveLocalVersions(remoteVersions);
      }

      console.log(`\n✨ Synced ${synced} file(s) successfully!`);
      return { success: true, synced };
    }

    return { success: true, synced: 0 };
  }

  async syncSubject(subjectName) {
    const remoteVersions = await this.fetchRemoteVersions();
    const subjectInfo = remoteVersions.dataFiles[subjectName];

    if (!subjectInfo) {
      throw new Error(`Subject not found: ${subjectName}`);
    }

    const localPath = path.join(this.dataDir, subjectInfo.file);

    console.log(`\n📥 Syncing ${subjectName}...\n`);
    console.log(`  Questions: ${subjectInfo.questionCount}`);
    console.log(`  Last updated: ${subjectInfo.lastUpdated}`);

    await this.downloadFile(subjectInfo.url, localPath);

    if (this.localVersions && this.localVersions.dataFiles[subjectName]) {
      this.localVersions.dataFiles[subjectName] = subjectInfo;
      this.saveLocalVersions(this.localVersions);
    }

    console.log(`\n✅ ${subjectName} synced successfully!`);
    return { success: true };
  }
}
