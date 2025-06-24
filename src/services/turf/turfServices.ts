import { axiosInstance } from "../../api/private.axios";
import { turfAxiosInstance } from "../../api/turf.axios";
import { TurfBookingResponse } from "../../components/turf/bookingManagement";
import { ChangePasswordData } from "../../hooks/user/userDashboard";

export const logoutTurf = async () => {
  const response = await turfAxiosInstance.post("/_ts/turf/logout");
  return response.data;
};
export const generateSlots = async (
  turfId: string,
  date: string,
  startTime: string,
  endTime: string,
  slotDuration: number,
  price: number
) => {
  const response = await turfAxiosInstance.post("/_ts/turf/generateSlots", {
    turfId,
    date,
    startTime,
    endTime,
    slotDuration,
    price,
  });
  return response.data;
};

export const generateSlotsDateRange = async (
  turfId: string,
  selectedDate: string, // start date
  endDate: string, // end date
  startTime: string,
  endTime: string,
  slotDuration: number,
  price: number
) => {
  const response = await axiosInstance.post("/_ts/turf/generateSlots", {
    turfId,
    selectedDate,
    endDate,
    startTime,
    endTime,
    slotDuration,
    price,
  });
  return response.data;
};

export const changeTurfPassword = async (data: ChangePasswordData) => {
  const response = await axiosInstance.patch("/_ts/turf/change-password", data);
  console.log("changeturfPassword response", response);
  return response.data;
};

export const fetchSlots = async (turfId: string, date: string) => {
  const response = await axiosInstance.get(
    `/_ts/turf/slots?turfId=${turfId}&date=${date}`
  );
  return response.data;
};

export const updateSlotStatus = async (id: string) => {
  const response = await axiosInstance.patch(`/_ts/turf/updateSlot?id=${id}`);
  return response;
};

export const getTurfBookings = async (): Promise<TurfBookingResponse> => {
  const response = await axiosInstance.get(`/_ts/turf/getBookingDetials`);
  console.log("respomse of the bppl", response);

  return response.data.data;
};

export const cancelTurfBooking = async (
  bookingId: string,
  bookingType: string
) => {
  const response = await axiosInstance.patch(`/_ts/turf/cancelBooking`, {
    bookingId,
    bookingType,
  });
  return response.data;
};

export const getTurfDashBoardData = async () => {
  const response = await axiosInstance.get(`/_ts/turf/getTurfDashBoardData`);
  console.log("dashBoard", response);
  return response.data.dashBoardData;
};
