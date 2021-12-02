// @ts-ignore
import { storiesOf } from "@storybook/html";
import { withKnobs} from "@storybook/addon-knobs";
import "./index";
// @ts-ignore
import inputs from "./inputs.twig";
import mockData from "./inputs.data";

const stories = storiesOf("02-Atoms/Inputs", module);
stories.addDecorator(withKnobs);

stories.add("Sidebar Option", () => inputs({label:mockData.section.sidebar.label, variant: "a-sidebar__label -option"}))
stories.add("Sidebar Date Input", () => inputs({label:mockData.section.sidebar.label, variant: "a-sidebar__date"}))
stories.add("Searchbar", () => inputs({variant: "a-sidebar__searchbar"}))
stories.add("Results Card Date", () => inputs({month:mockData.section.results.card.month, day:mockData.section.results.card.day, year:mockData.section.results.card.year, variant: "a-resultsCard__date"}))
stories.add("Results Card Time", () => inputs({time:mockData.section.results.card.time, variant: "a-resultsCard__time"}))
stories.add("Results Card location", () => inputs({location:mockData.section.results.card.location, variant: "a-resultsCard__location"}))
stories.add("Paginate Index", () => inputs({ index: mockData.section.results.pagination.index, variant: "a--paginate__index"}))

