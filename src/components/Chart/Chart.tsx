import { FC } from "react";
import StyledChart from ".";
import { getCategoriesPercentage } from "../../helpers/getCategoriesAmount";
import { ExpensesCategory } from "../../types/Expenses";
import { BarChart } from "../BarChart/BarChart";
import { PieChart } from "../PieChart/PieChart";

interface Props {
  dataList: ExpensesCategory[];
  type: "bar" | "pie";
}

export const Chart: FC<Props> = ({ dataList = [], type }) => {
  return (
    <StyledChart.ChartContainer>
      {type === "bar" && <BarChart dataList={dataList} />}
      {type === "pie" && (
        <PieChart dataList={getCategoriesPercentage(dataList)} />
      )}
    </StyledChart.ChartContainer>
  );
};
