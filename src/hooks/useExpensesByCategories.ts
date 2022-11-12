import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { convertToExpensesWithCategory } from "../converters/convertToSimpleExpenses";
import { getCategoriesAmount } from "../helpers/getCategoriesAmount";
import { ExpensesCategory } from "../types/Expenses";

interface Data {
  expensesByCategories: ExpensesCategory[];
  loading: boolean;
}

export const useExpensesByCategories = (): Data => {
  const {
    dataList,
    selectedMonth,
    loading: expensesLoading,
  } = useAppSelector((state) => state.expenses);

  const { categoryList, loading: categoryLoading } = useAppSelector(
    (state) => state.category
  );

  const [expensesByCategories, setExpensesByCategories] = useState<Data>({
    expensesByCategories: [],
    loading: true,
  });

  useEffect(() => {
    if (!expensesLoading && !categoryLoading) {
      const actualMonth = dataList.filter(
        (e) =>
          e.date.year() === moment().year() &&
          e.date.format("MMMM") === selectedMonth
      );
      const convertedList = convertToExpensesWithCategory(
        actualMonth,
        categoryList
      );
      const categoriesAmount = getCategoriesAmount(convertedList);
      setExpensesByCategories({
        expensesByCategories: categoriesAmount,
        loading: false,
      });
    } else {
      setExpensesByCategories({ expensesByCategories: [], loading: true });
    }
  }, [dataList, categoryList, selectedMonth]);

  return expensesByCategories;
};
