import { resolve } from 'path';
import { chdir, cwd } from 'process';

const cd = (path) => {
  chdir(resolve(cwd(), path));
};

export default cd;
