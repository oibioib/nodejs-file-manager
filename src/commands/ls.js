import { readdir } from 'fs/promises';
import { cwd } from 'process';

const ls = async () => {
  const dirContent = await readdir(cwd(), { withFileTypes: true });

  const directories = [];
  const files = [];

  dirContent.forEach((item) => {
    if (item.isFile()) {
      files.push({
        Name: item.name,
        Type: 'file',
      });
    } else if (item.isDirectory()) {
      directories.push({
        Name: item.name,
        Type: 'directory',
      });
    }
  });

  console.table([...directories, ...files]);
};

export default ls;
