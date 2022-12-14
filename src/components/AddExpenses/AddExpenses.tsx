import { FC, useState } from "react";
import StyledModal from ".";
import { Moment } from "moment";
import { Expenses } from "../../types/Expenses";
import { Button } from "../Button/Button";
import { DatePicker } from "../DatePicker/DatePicker";
import { InputField } from "../InputField/InputField";
import { Select } from "../Select/Select";
import { Category } from "../../types/Category";

interface Props {
  categoryList: Category[];
  onSave: (newExpense: Expenses) => void;
  error?: string;
}

export const AddExpenses: FC<Props> = ({ categoryList, onSave, error }) => {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState<Moment | null>(null);

  const onSubmit = () => {
    if (!!amount && category && date) {
      const newExpense: Expenses = {
        amount: Number(amount),
        category: category,
        note,
        date: date,
      };
      onSave(newExpense);
    }
  };

  return (
    <>
      <StyledModal.Title>
        <h3>Add Expenses</h3>
      </StyledModal.Title>
      <InputField
        type="number"
        endAdornment="€"
        value={amount}
        setValue={setAmount}
      />
      <StyledModal.Spacing />
      <Select
        value={category}
        options={categoryList.map((e) => e.name)}
        setValue={setCategory}
        placeholder="Select Category"
      />
      <StyledModal.Spacing />
      <InputField placeholder="Note" value={note} setValue={setNote} />
      <StyledModal.Spacing />
      <DatePicker value={date} setValue={setDate} />
      <StyledModal.Spacing />
      <StyledModal.ButtonContainer>
        <Button
          variant="success"
          label="Save"
          onClick={onSubmit}
          disabled={!amount || !category || !date}
        />
      </StyledModal.ButtonContainer>
      <StyledModal.ErrorText>{error}</StyledModal.ErrorText>
    </>
  );
};
