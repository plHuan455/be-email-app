// third-party
import { Theme } from '@mui/material';
import { merge } from 'lodash';

import Button from './Button';
import Input from './Input';
import Paper from './Paper';

export default function ComponentsOverrides(theme: Theme) {
  return merge(Button(theme), Paper(theme), Input(theme));
}
