import { useUserContext } from '../context/user.context';

export default function IndexPage() {
    const { user } = useUserContext();
    return (
        <div>
            {user && (
                <h1>Welcome {user.name} to Airbnb</h1>
            )}
        </div>
    )
}