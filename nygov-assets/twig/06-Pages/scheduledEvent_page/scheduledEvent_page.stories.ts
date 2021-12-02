import { storiesOf } from "@storybook/html";
import "./index";
// @ts-ignore
import scheduledEventPage from "./scheduledEvent_page.twig";
import { scheduledEventData } from "./scheduledEvent_page.data";

const stories = storiesOf("06-Pages/Pages", module);

stories.add("ScheduledEvent Page", () => {
    return scheduledEventPage(scheduledEventData);
});
