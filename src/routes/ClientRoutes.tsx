import { Route, Routes } from "react-router-dom";
import {ProtectedRoutes} from "../routes/protected/AuthRoutes"
import TurfXDashboard from "../pages/user/userDashboard";
import Profile from "../pages/user/Profile";
import TurfDetailsPage from "../pages/user/turfDetialsPage";
import BookingsPage from "../pages/user/bookingPage";
import HostGamePage from "../pages/user/hostGame";
import HostedGamesPage from "../pages/user/hosted-game";
import JoinedGameDetails from "../pages/user/JoinedGameDetails";
import WalletPage from "../pages/user/WalletPage";
import ChatRoom from "../components/chatRoom/chatRoom";
import CommunityPage from "../pages/user/communityPage";
import TurfList from "../pages/user/turfListPage";




export function UserRoutes(){
    return(
        <Routes>
            <Route
            path="/"
            element={<ProtectedRoutes allowedRoles={["user"]} element={<TurfXDashboard/>}/>}
            />
            <Route
            path="/user/turfList"
            element={<ProtectedRoutes allowedRoles={["user"]} element={<TurfList/>}/>}
            />
            <Route
            path="/user/profile"
            element={<ProtectedRoutes allowedRoles={['user']} element={<Profile/>}/>}
            />
            <Route
            path="/user/turfDetialsPage/:turfId"
            element={<ProtectedRoutes allowedRoles={['user']} element={<TurfDetailsPage/>}/>}
            />
            <Route
            path="/user/bookings"
            element={<ProtectedRoutes allowedRoles={['user']} element={<BookingsPage/>}/>}
            />
            <Route
            path="/user/wallet"
            element={<ProtectedRoutes allowedRoles={['user']} element={<WalletPage/>}/>}
            />
            <Route
                path="/user/hostGame/:slotId/:duration"
                element={<ProtectedRoutes allowedRoles={['user']} element={<HostGamePage />} />}
            />
            <Route
            path="/user/hostedGames"
            element={<ProtectedRoutes allowedRoles={['user']} element={<HostedGamesPage/>}/>}/>
            <Route
            path="/user/joinedGameDetails/:joinedGameId"
            element={<ProtectedRoutes allowedRoles={['user']} element={<JoinedGameDetails/>}/>}/>

            <Route
                path="/user/chatRoom/:gameId/:userId"
                element={<ProtectedRoutes allowedRoles={['user']} element={<ChatRoom gameId={""} userId={""}  />} />}
            />

            <Route
                path="/user/messages"
                element={<ProtectedRoutes allowedRoles={['user']} element={<CommunityPage/>} />}
            />


        </Routes>
    )
}