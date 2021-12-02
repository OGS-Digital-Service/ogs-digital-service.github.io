// @ts-ignore
import { storiesOf } from '@storybook/html';
import { withKnobs, select } from "@storybook/addon-knobs";


// @ts-ignore
import allframes from './frames.twig';

import './index.ts';

import { mockData as frames, mockData } from './frames.data'

const stories = storiesOf("05-Templates/Frames", module);
stories.addDecorator(withKnobs);


stories.add("Frames", () => allframes({ node: { ...frames } }));
