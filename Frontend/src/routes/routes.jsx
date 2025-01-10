import { createBrowserRouter } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AccountPage from "../pages/AccountPage";
import Bookings from "../components/Bookings";
import Places from "../components/Places";
import PlacePage from "../pages/PlacePage";
import SearchPage from '../pages/SearchPage';
import App from "../App";


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <IndexPage />
            },
            {
                path: '/s',
                element: <SearchPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
            {
                path: '/account',
                element: <AccountPage />,
                children: [
                    {
                        path: 'bookings',
                        element: <Bookings />
                    },
                    {
                        path: 'places',
                        element: <Places />,
                        children: [
                            {
                                path: 'new',
                                element: <Places />
                            }
                        ]
                    }

                ]
            },
            {
                path: 'places/:placeId',
                element: <PlacePage />,
            }
        ]
    },
])

export default appRouter;