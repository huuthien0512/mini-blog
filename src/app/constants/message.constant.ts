export const LOGIN = {
  WRONG: "Username or password isn't correct.",
  DISABLED:
    'Your account has been disabled, please contact administrator for more inforation.',
};

export const REGISTER = {
  SUCCESS: 'Register successfully.',
};

export const BLOG = {
  GET_FAIL: 'Data load failed.',
  DELETE_PERMANENT_CONFIRM:
    'Permanently delete this file, do you want to continue?.',
  DELETE_DUSTBIN_CONFIRM:
    'Put this file into the dustbin, do you want to continue?.',
  DELETE_SUCCESS: 'Deleted successfully.',
  DELETE_CANCEL: 'Delete canceled.',
  DELETE_FAIL: 'Failed to delete!',
  RESTORE_CONFIRM:
    "Restore the blog to it's original location, do you want to continue?.",
  RESTORE_SUCCESS: 'Restored successfully.',
  RESTORE_FAIL: 'Restore failed.',
  RESTORE_CANCEL: 'Restore canceled.',
};

export const CATEGORY = {
  GET_FAIL: 'Data load failed.',
  DELETE_SUCCESS: 'Deleted successfully.',
  DELETE_CANCEL: 'Delete canceled.',
  DELETE_FAIL: 'Failed to delete.',
  DELETE_FAIL_USED: 'There are blogs still under this category, delete failed.',
  EDIT_SUCCESS: 'Edited successfully.',
  EDIT_FAIL: 'Edited failed.',
  EDIT_CANCEL: 'Edited canceled.',
};
