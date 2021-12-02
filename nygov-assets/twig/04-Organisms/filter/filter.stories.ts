// @ts-ignore
import { storiesOf } from "@storybook/html";
import { withKnobs, select } from "@storybook/addon-knobs";
import "./index";

// @ts-ignore
import filter from "./StorybookDisplay/filter.twig";
import mockData from "./filter.data";

const stories = storiesOf("04-Organisms/Filter", module);
stories.addDecorator(withKnobs);

stories.add("Filter Option", () => {
  const filterDefault = { ...mockData };
  const filterDate = { ...mockData, id: "date" };
  const checkedLabel = { ...mockData, checked: "checked" };

  //Sidebar knobs
  const filterOption = select("Filter Option", ["Default", "Date"], "Default");
  const selectOptions = select("Select Option", ["Unselect All", "Select All"], "Unselect All");

  const sidebarKnob = () => {
    if (filterOption === "Default" && selectOptions === "Unselect All") {
      return filterDefault;
    } else if (filterOption === "Date" && selectOptions === "Unselect All") {
      return filterDate;
    } else if (filterOption === "Default" && selectOptions === "Select All") {
      return checkedLabel;
    } else {
      return checkedLabel;
    }
  };

  const output = sidebarKnob();

  return filter(output);
});
