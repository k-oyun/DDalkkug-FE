import axios from "./AxiosInstance";

// const BASE_URL = "https://api.ddalkkug.kro.kr/api/v1/calendar-entries";

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

  return { calendarGet, monthChartGet, weekChartGet };
};

export default useMainApi;
