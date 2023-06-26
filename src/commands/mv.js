import cp from './cp.js';
import rm from './rm.js';

const mv = async (...params) => {
  await cp(...params);
  await rm(...params);
};

export default mv;
