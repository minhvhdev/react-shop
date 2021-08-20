import vi from "date-fns/locale/vi";
import { useField, useFormikContext } from "formik";
import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";

function DatePickerForm(props) {
  registerLocale("vi", vi);
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      locale="vi"
      dateFormat="dd/MM/yyyy"
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
}

export default DatePickerForm;
