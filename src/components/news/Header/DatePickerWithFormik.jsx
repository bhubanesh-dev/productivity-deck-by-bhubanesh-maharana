import dayjs from "dayjs";
import { useFormikContext } from "formik";
import { DatePicker } from "neetoui";
import { withT } from "utils/withT";

const DatePickerWithFormik = ({ t }) => {
  const { setFieldValue, values } = useFormikContext();

  return (
    <DatePicker
      dateFormat="DD/MM/YYYY"
      label={t("news.filters.date")}
      maxDate={dayjs()}
      name="dateRange"
      picker="date"
      type="range"
      value={values.dateRange}
      onChange={val => setFieldValue("dateRange", val)}
    />
  );
};

export default withT(DatePickerWithFormik);
