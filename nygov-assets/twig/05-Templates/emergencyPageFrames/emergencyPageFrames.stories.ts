// @ts-ignore
import { storiesOf } from '@storybook/html';

// @ts-ignore
import Frames from './emergencyPageFrames.twig';

import './index.ts';
import { mockData as frames } from './emergencyPageFrames.data';

const stories = storiesOf("05-Templates/Emergency Page Frames", module);

stories.add("Frames", () => Frames({ node: { ...frames } }));
