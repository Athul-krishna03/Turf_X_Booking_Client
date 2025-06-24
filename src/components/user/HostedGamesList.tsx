// HostedGamesList.tsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchHostedGames, sharedSlotJoin } from "../../services/user/userServices"; // Import sharedSlotJoin
import { Calendar, Clock, MapPin, Users, DollarSign, ChevronRight, Search,ArrowLeft} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import HostedGameDialog from "./HostGameDialog";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export interface HostedGame {
  userIds: any[];
  _id: string;
  title: string;
  hostName: string;
  venueName: string;
  location: string;
  date: string;
  time: string;
  duration: number;
  playersJoined: number;
  playerCount: number;
  amountPerPlayer: number;
  sportType: "football";
  description?: string;
  status: string;
  imageUrl?: string;
}

const HostedGamesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGame, setSelectedGame] = useState<HostedGame | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const { data: hostedGames, isLoading } = useQuery({
    queryKey: ["hostedGames"],
    queryFn: fetchHostedGames,
  });

  const joinGameMutation = useMutation({
    mutationFn: ({ date, slotId, price }: { date: string; slotId: string; price: number }) =>
      sharedSlotJoin(date, slotId, price),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["hostedGames"]})
    },
    onError: () => {
      toast.error("Failed to join the game. Please try again.");
    },
  });
  console.log("hostedGames list",hostedGames)
  const filteredGames = hostedGames?.filter((game: HostedGame) => {
    console.log("filter games",game);
    
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.hostName.toLowerCase().includes(searchTerm.toLowerCase());


    return matchesSearch;
  }) ?? [];

  const handleGameSelect = (game: HostedGame) => {
    setSelectedGame(game);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-black min-h-screen text-green-100">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>
      </div>
      <h1 className="text-2xl font-bold text-green-400 mb-6">Hosted Games</h1>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
          <Input
            type="text"
            placeholder="Search games, venues, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-300 text-black"
          />
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-[#161A30] border-t-transparent rounded-full animate-spin"></div>
          <p className="ml-3 text-white-600">Loading hosted games...</p>
        </div>
      )}

      {!isLoading && filteredGames.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-lg font-medium text-green-400 mb-2">No games found</h3>
          <p className="text-green-400 max-w-md mx-auto">
            There are no hosted games matching your search criteria.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game: HostedGame) => (
          game.status !== "Cancelled" &&
          <div
            key={game._id}
            className="bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-900 hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleGameSelect(game)}
          >
            <div className="h-40 bg-gray-200 relative">
              <img
                src={game.imageUrl || `/placeholder.svg?height=160&width=400`}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              <Badge
                className={`absolute top-3 right-3 ${
                  game.status === "Booked"
                    ? "bg-green-500"
                    : game.status === "Pending"
                    ? "bg-orange-500"
                    : "bg-gray-500"
                }`}
              >
                {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
              </Badge>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-green-500 truncate">{game.title}</h3>
                <Badge variant="outline" className="bg-[#F0ECE5] text-[#31304D] border-none">
                  {game.sportType}
                </Badge>
              </div>
              <div className="space-y-2 mb-4 text-sm text-white-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-white-400" />
                  <span className="truncate">{game.venueName}, {game.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-white-400" />
                  <span>{game.date}</span>
                  <Clock className="h-4 w-4 ml-3 mr-2 text-white-400" />
                  <span>{game.time}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-white-400" />
                  <span>{game.playersJoined}/{game.playerCount} players joined</span>
                </div>
                <div className="flex items-center font-medium text-white">
                  <DollarSign className="h-4 w-4 mr-2 text-white-400" />
                  ₹{game.amountPerPlayer} per player
                </div>
              </div>
              <div className="flex justify-between items-center text-sm text-white-500">
                <div>Hosted by {game.hostName}</div>
                <Button variant="ghost" size="sm" className="text-green-500 hover:bg-[#F0ECE5]">
                  View <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <HostedGameDialog
        game={selectedGame}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onJoinGame={joinGameMutation.mutate}
      />
    </div>
  );
};

export default HostedGamesList;