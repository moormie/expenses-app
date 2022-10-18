import moment from "moment";
import { FC, useEffect, useState, useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import { Loading } from "../components/Loading";
import { HomeScreen } from "../components/Screens/Home/Home";
import { Expenses } from "../types/Expenses";

const HomePage: FC = () => {
  const { dataList, status } = useAppSelector((state) => state.expenses);

  const [sortedExpensesList, setSortedExpensesList] = useState<Expenses[]>([]);

  const loading = useMemo(() => {
    return status === "loading";
  }, [status]);

  useEffect(() => {
    const actualMonth = dataList.filter(
      (e) =>
        e.date.month() === moment().month() && e.date.year() === moment().year()
    );
    setSortedExpensesList(actualMonth as Expenses[]);
  }, [dataList]);

  return (
    <>
      {loading && <Loading />}
      <HomeScreen expensesList={sortedExpensesList} />
    </>
  );
};

export default HomePage;
