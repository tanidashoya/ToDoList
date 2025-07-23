import styles from './Header.module.css';
import {NavLink} from 'react-router-dom';




function Header() {

    return(
        <header className={styles.header}>
            <nav className={styles.nav}>
                {/* navLinkクラスはどちらにしても渡される */}
                {/* アクティブなページに対してはactiveクラスを追加する */}
                {/* isActiveはNavLinkのpropsで、現在のページがアクティブかどうか(true/false)を示す */}
                {/* NavLink が自動で渡してくれる「表示中かどうか」の真偽値 */}
                <NavLink to="/" className={({isActive}) => `${styles.navLink} ${(isActive) ? styles.active : ""}`}>ToDo</NavLink>
                <NavLink to="/memo" className={({isActive}) => `${styles.navLink} ${(isActive) ? styles.active : ""}`}>Memo</NavLink>
            </nav>
        </header>
    )
}

export default Header;