import { access, constants } from 'fs/promises';

export const isDirOrFileExist = async (path) => {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch (error) {
    return false;
  }
};
