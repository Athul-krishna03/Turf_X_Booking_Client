import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TurfBookingResponse } from "../turf/bookingManagement";
import { CalendarCheck2, Users2 } from "lucide-react";
import { CardLoadingSkeleton } from "../ui/loading/loading-skeletons";
import NormalBookingCard from "../turf/normalBookingCard";
import { Pagination1 } from "./Pagination";
import HostedgameCard from "../turf/hostedGame"
import { getRevenueData } from "../../services/admin/adminService";


const RevenueManagement = () => {
  const [tab, setTab] = useState("normal");
  const [normalBookingPage, setNormalBookingPage] = useState(1);
  const [hostedBookingPage, setHostedBookingPage] = useState(1);
  const [bookingData, setBookingData] = useState<TurfBookingResponse>({
    normal: [],
    hosted: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const data = await getRevenueData();
        setBookingData(data);
      } catch (err) {
        console.error("Failed to fetch turf bookings", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const normalBookingPaginated = bookingData.normal.slice(
    (normalBookingPage - 1) * ITEMS_PER_PAGE,
    normalBookingPage * ITEMS_PER_PAGE
  );

  const hostedGamesPaginated = bookingData.hosted.slice(
    (hostedBookingPage - 1) * ITEMS_PER_PAGE,
    normalBookingPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="ml-4 flex-1  overflow-auto">

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-white border border-gray-200 mb-6">
            <TabsTrigger
              value="normal"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white px-4 py-2"
            >
              <CalendarCheck2 className="w-4 h-4 mr-2" />
              Normal Bookings
            </TabsTrigger>
            <TabsTrigger
              value="hosted"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white px-4 py-2"
            >
              <Users2 className="w-4 h-4 mr-2" />
              Hosted Games
            </TabsTrigger>
          </TabsList>
          <TabsContent value="normal">
            {isLoading ? (
              <CardLoadingSkeleton />
            ) : bookingData.normal.length === 0 ? (
              <p className="text-gray-500">No normal bookings found.</p>
            ) : (
              <div className="space-y-4">
                {normalBookingPaginated.map((booking) => (
                  <NormalBookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={()=>{}}
                    userType="admin"
                  />
                ))}
                <Pagination1
                  currentPage={normalBookingPage}
                  totalPages={Math.ceil(
                    bookingData.normal.length / ITEMS_PER_PAGE
                  )}
                  onPagePrev={() =>
                    setNormalBookingPage((p) => Math.max(p - 1, 1))
                  }
                  onPageNext={() =>
                    setNormalBookingPage((p) =>
                      Math.min(
                        p + 1,
                        Math.ceil(bookingData.normal.length / ITEMS_PER_PAGE)
                      )
                    )
                  }
                />
              </div>
            )}
          </TabsContent>
          <TabsContent value="hosted">
            {isLoading ? (
              <p>Loading hosted games...</p>
            ) : bookingData.hosted.length === 0 ? (
              <p className="text-gray-500">No hosted games found.</p>
            ) : (
              <div className="space-y-4">
                {hostedGamesPaginated.map((game) => (
                  <HostedgameCard
                    key={game.id}
                    game={game}
                    onCancel={()=>{}}
                    userType="admin"
                    
                  />
                ))}
                <Pagination1
                  currentPage={hostedBookingPage}
                  totalPages={Math.ceil(
                    bookingData.hosted.length / ITEMS_PER_PAGE
                  )}
                  onPagePrev={() =>
                    setHostedBookingPage((p) => Math.max(p - 1, 1))
                  }
                  onPageNext={() =>
                    setHostedBookingPage((p) =>
                      Math.min(
                        p + 1,
                        Math.ceil(bookingData.hosted.length / ITEMS_PER_PAGE)
                      )
                    )
                  }
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RevenueManagement;
