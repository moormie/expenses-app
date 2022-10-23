import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FilterExpenses } from "./FilterExpenses";

export default {
  title: "Components/FilterExpenses",
  component: FilterExpenses,
} as ComponentMeta<typeof FilterExpenses>;

const Template: ComponentStory<typeof FilterExpenses> = (args) => (
  <FilterExpenses {...args} />
);

export const Default = Template.bind({});

Default.args = {};