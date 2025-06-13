import axios from "./AxiosInstance";

const useMainApi = () => {
  const calendarGet = async (year, month) => {
    return await axios.get(
      `/calendar-entries/month?year=${year}&month=${month}`,
    );
  };

  const monthChartGet = async (year, month) => {
    return await axios.get(
      `/calendar-entries/month-expense?year=${year}&month=${month}`,
    );
  };

  const weekChartGet = async () => {
    return await axios.get(`/calendar-entries/current-weekdays`);
  };

  const PriceGet = async (year, month, weekOfMonth) => {
    return await axios.get(
      `/calendar-entries/week-expense?year=${year}&month=${month}&weekOfMonth=${weekOfMonth}`,
    );
  };

  const groupListGet = async () => {
    return await axios.get("/group-info");
  };

  return { calendarGet, monthChartGet, weekChartGet, PriceGet, groupListGet };
};

export default useMainApi;
