import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { Loading } from "../components/Loading";
import { ExpensesList } from "../components/Screens/Expenses/Expenses";
import { getSortedExpensesList } from "../helpers/getSortedExpensesList";
import { Expenses } from "../types/Expenses";

const ExpensesPage: FC = () => {
  const navigate = useNavigate();
  const { dataList, status } = useAppSelector((state) => state.expenses);
  const { sortValue: transactionSortValue } = useAppSelector(
    (state) => state.details
  );

  const [sortedExpensesList, setSortedExpensesList] = useState<Expenses[]>([]);

  useEffect(() => {
    setSortedExpensesList(
      getSortedExpensesList(dataList, transactionSortValue) as Expenses[]
    );
  }, [transactionSortValue, dataList]);

  const loading = useMemo(() => {
    return status === "loading";
  }, [status]);

  const onClickBack = () => {
    navigate("/");
  };

  return (
    <>
      {loading && <Loading />}
      <ExpensesList dataList={sortedExpensesList} onClickBack={onClickBack} />;
    </>
  );
};

export default ExpensesPage;
