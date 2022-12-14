import { FC } from "react";
import styled from "styled-components";
import { NavBar } from "../../NavBar/NavBar";
import { Expenses } from "./Expenses";
import { Incomes } from "./Incomes";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  ChartType,
  DetailType,
  setType,
} from "../../../features/details/detailsSlice";
import { useExpensesByCategories } from "../../../hooks/useExpensesByCategories";
import moment from "moment";

const MainContainer = styled.div`
  padding: 24px;
  @media (max-width: 1120px) {
    padding-bottom: 60px;
  }
`;

const Spacing = styled.div`
  height: 18px;
`;

interface Props {
  onClickBack: () => void;
}

export const DetailsScreen: FC<Props> = () => {
  const { expensesByCategories } = useExpensesByCategories();
  const { allIncomes } = useAppSelector((state) => state.incomes);
  const { type, chart } = useAppSelector((state) => state.details);
  const { selectedMonth } = useAppSelector((state) => state.expenses);
  const dispatch = useAppDispatch();

  const selectTab = (tab: string) => {
    dispatch(setType(tab as DetailType));
  };

  return (
    <MainContainer>
      <NavBar
        elements={Object.values(DetailType)}
        selectedElement={type}
        onSelectElement={selectTab}
      />
      <Spacing />
      {type === DetailType.EXPENSES && (
        <Expenses
          isBarChart={chart === ChartType.BAR}
          expensesByCategories={expensesByCategories}
          date={selectedMonth}
        />
      )}
      {type === DetailType.INCOME && (
        <Incomes
          dataList={[...allIncomes].sort((a, b) =>
            moment(b.date).format("X").localeCompare(moment(a.date).format("X"))
          )}
        />
      )}
    </MainContainer>
  );
};
