// @ts-ignore
import { storiesOf } from '@storybook/html';

// @ts-ignore
import allframes from './taxonomyTermFrames.twig';

import './index.ts';

import { mockData as frames } from './taxonomyTermFrames.data'

const stories = storiesOf("05-Templates/Taxonomy Term Frames", module);

stories.add("Frames", () => allframes({ term: { ...frames } }));
