import { createBrowserRouter } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AccountPage from "../pages/AccountPage";
import Bookings from "../components/Bookings";
import Places from "../components/Places";
import App from "../App";


const appRouter = createBrowserRouter([
    {
        path : "/",
        element : <App />,
        children : [
            {
                path : "/",
                element : <IndexPage />
            },
            {
                path : "/login",
                element : <LoginPage />
            },
            {
                path : "/register",
                element : <RegisterPage />
            },
            {
                path : '/account',
                element : <AccountPage />,
                children : [
                    {
                        path : 'bookings',
                        element : <Bookings />
                    },
                    {
                        path : 'places',
                        element : <Places />,
                        children : [
                            {
                                path : 'new',
                                element : <Places />
                            }                            
                        ]
                    }
                ]
            }
        ] 
    },
])

export default appRouter;