import { BookIcon, CalendarDays,LayoutDashboard,LogOut,Settings} from "lucide-react"
import { Button } from "../../components/ui/button"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { turfLogout } from "../../store/slices/turf.slice";
import { toast } from "../../hooks/useToast";
import { useTurfLogout } from "../../hooks/auth/useAuth";


const TurfSideBar = () => {
    const Logout = useTurfLogout()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogout=async ()=>{
      const response = await Logout.mutateAsync()
      console.log(response);
      
      dispatch(turfLogout());
      toast({
          title: "Success!",
          description: "logout successful!",
          duration: 3000,
        });
      navigate("/turf/login")
    }
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-bold">Turf Dashboard</h2>
    </div>

    <nav className="flex-1 p-4 space-y-1">
      <Button variant="ghost" className="w-full justify-start gap-3" onClick={()=>navigate("/turf/dashboard")}>
        <LayoutDashboard size={18} />
        Dashboard
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600" onClick={()=>navigate("/turf/slotManagement")}>
        <CalendarDays size={18} />
        Slot Management
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600" onClick={()=>navigate("/turf/bookingManagement")}>
        <BookIcon size={18} />
        Booking Management
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-3 text-gray-600" onClick={()=>navigate("/turf/settings")}>
        <Settings size={18} />
        Settings
      </Button>
    </nav>

    <div className="p-4 border-t border-gray-200">
      <Button variant="ghost" className="w-full justify-start gap-3 text-red-600" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </Button>
    </div>
  </aside>
  )
}

export default TurfSideBar