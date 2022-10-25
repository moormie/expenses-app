import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Loading } from "../components/Loading";
import { ExpensesList } from "../components/Screens/Expenses/Expenses";
import { remove } from "../features/expenses/expensesSlice";
import {
  setAmountFrom,
  setAmountTo,
  setCategories,
  setDateFrom,
  setDateTo,
  setNote,
  setSortValue,
} from "../features/filters/filterSlice";
import { getFilteredExpenses } from "../helpers/getFilteredExpenses";
import { getSortedExpensesList } from "../helpers/getSortedExpensesList";
import { Expenses } from "../types/Expenses";
import { FilterValues } from "../types/FilterValues";
import { SortType } from "../types/SortType";

const ExpensesPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { dataList: allExpenses, status } = useAppSelector(
    (state) => state.expenses
  );
  const {
    sortValue,
    categories,
    dateFrom,
    dateTo,
    amountFrom,
    amountTo,
    note = "",
  } = useAppSelector((state) => state.filter);

  const [sortedExpensesList, setSortedExpensesList] = useState<Expenses[]>([]);

  useEffect(() => {
    setSortedExpensesList(
      getSortedExpensesList(allExpenses, sortValue) as Expenses[]
    );
  }, [sortValue, allExpenses]);

  useEffect(() => {
    setSortedExpensesList(
      getFilteredExpenses(allExpenses, {
        categories,
        dateFrom,
        dateTo,
        amountFrom,
        amountTo:
          amountTo ?? Math.max(...allExpenses.map((data) => data.amount)),
        note,
      }) as Expenses[]
    );
  }, [allExpenses, categories, dateFrom, dateTo, amountFrom, amountTo, note]);

  const loading = useMemo(() => {
    return status === "loading";
  }, [status]);

  const onClickBack = () => {
    navigate("/");
  };

  const onSubmitSort = (value: string) => {
    dispatch(setSortValue(value as SortType));
  };

  const onResetSort = () => {
    dispatch(setSortValue(undefined));
  };

  const onSubmitFilter = (values: FilterValues) => {
    dispatch(setCategories(values.categories));
    dispatch(setDateFrom(values.dateFrom));
    dispatch(setDateTo(values.dateTo));
    dispatch(setAmountFrom(values.amountFrom));
    dispatch(setAmountTo(values.amountTo));
    dispatch(setNote(values.note));
  };

  const onResetFilter = () => {
    categories.length > 0 && dispatch(setCategories([]));
    dateFrom !== null && dispatch(setDateFrom(null));
    dateTo !== null && dispatch(setDateTo(null));
    amountFrom !== 0 && dispatch(setAmountFrom(0));
    amountTo !== undefined &&
      dispatch(
        setAmountTo(Math.max(...allExpenses.map((data) => data.amount)))
      );
    !!note && dispatch(setNote(""));
  };

  const onDeleteExpense = (id: string) => {
    dispatch(remove(id));
  };

  return (
    <>
      {loading && <Loading />}
      <ExpensesList
        dataList={sortedExpensesList}
        onClickBack={onClickBack}
        submitSort={onSubmitSort}
        resetSort={onResetSort}
        submitFilter={onSubmitFilter}
        resetFilter={onResetFilter}
        deleteExpense={onDeleteExpense}
      />
    </>
  );
};

export default ExpensesPage;
