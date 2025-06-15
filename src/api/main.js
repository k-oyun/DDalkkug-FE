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

  const groupCalendarGet = async (groupId, year, month) => {
    return await axios.get(
      `/calendar-entries/group/${groupId}/month?year=${year}&month=${month}`,
    );
  };

  const groupWeekChartGet = async (groupId) => {
    return await axios.get(
      `calendar-entries/group/${groupId}/current-weekdays`,
    );
  };
  const groupMonthChartGet = async (groupId) => {
    return await axios.get(`calendar-entries/group/${groupId}/month-expense`);
  };

  const GroupPriceGet = async (groupId, year, month, weekOfMonth) => {
    return await axios.get(
      `calendar-entries/group/${groupId}/week-expense?year=${year}&month=${month}&weekOfMonth=${weekOfMonth}`,
    );
  };

  return {
    calendarGet,
    monthChartGet,
    weekChartGet,
    PriceGet,
    groupListGet,
    groupCalendarGet,
    groupWeekChartGet,
    groupMonthChartGet,
    GroupPriceGet,
  };
};

export default useMainApi;
