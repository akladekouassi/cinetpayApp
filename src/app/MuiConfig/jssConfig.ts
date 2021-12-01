import { jssPreset } from '@material-ui/core/styles';

import { create } from 'jss';

export const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
} as any);
