import fs from 'fs/promises';
import path from 'path';

export const saveConnectionForUser = async (userId, appId, accessToken) => {
  const userDir = path.resolve('data/users', userId);
  const filePath = path.join(userDir, 'connections.json');

  console.info('CALLBACK 222', { userDir, filePath, appId, userId });

  await fs.mkdir(userDir, { recursive: true });

  console.info('CALLBACK 333', { userDir, filePath });

  let data = [];
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');

    console.info('CALLBACK 444', fileContent);

    if (fileContent.trim()) {
      data = JSON.parse(fileContent);
    }
  } catch {
    data = [];
  }

  console.info('CALLBACK 555', data);

  data.push({ appId, accessToken, timestamp: Date.now() });

  console.info('CALLBACK 777', data);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};
