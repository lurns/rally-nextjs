import { useAuth } from "../../store/auth-context";
import Link from 'next/link';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    const { auth, user, setUser } = useAuth();

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                { user ? <Link href="/dash">Rally</Link> : <Link href="/">Rally</Link>}
            </div>
            <nav>
                <ul>
                    { user && 
                    <>
                        <li>
                            <Link href="/messages">Messages</Link>
                        </li>
                        <li>
                            <Link href="/workouts">Workouts</Link>
                        </li>
                        <li>
                            <Link href="/workouts">Profile</Link>
                        </li>
                    </>
                    }

                </ul>
            </nav>
        </header>
    )

}

export default MainNavigation;