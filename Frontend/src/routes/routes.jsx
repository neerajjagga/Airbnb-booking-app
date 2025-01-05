import { createBrowserRouter } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
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
        ] 
    },
])

export default appRouter;