// @ts-ignore
import { storiesOf } from '@storybook/html';

// @ts-ignore
import Frames from './navigatorFrames.twig';

import './index.ts';
import * as frames from './navigatorFrames.data';

const stories = storiesOf("05-Templates/Navigator", module);

stories.add("Frames", () => 
  Frames({
    node: { ...frames }
  })
);
