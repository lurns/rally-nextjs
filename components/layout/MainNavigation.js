import Link from 'next/link';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
    // TODO: check if user

    return (
        <header className={classes.header}>
            <div className={classes.logo}>Rally</div>
            <nav>
                <ul>
                    <li>
                        <Link href="/">Link</Link>
                    </li>
                    <li>
                        <Link href="/">Link</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )

}

export default MainNavigation;