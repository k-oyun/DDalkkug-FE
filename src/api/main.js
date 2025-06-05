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

  const PriceGet = async () => {
    return await axios.get(`/calendar-entries/week-expense`);
  };

  return { calendarGet, monthChartGet, weekChartGet, PriceGet };
};

export default useMainApi;
