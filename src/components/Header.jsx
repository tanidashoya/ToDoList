import styles from './Header.module.css';
import {Link} from 'react-router-dom';


function Header() {

    return(
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" className={styles.navLink}>ToDo</Link>
                <Link to="/memo" className={styles.navLink}>Memo</Link>
            </nav>
        </header>
    )
}

export default Header;