import styles from './Layout.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {
    HomeOutlined,
    SearchOutlined,
    ProfileOutlined
} from '@ant-design/icons';

type Props = {
    label: string
    url: string
}

export default ({ label, url }: Props) => {
    const locationNav = useLocation()
    const nav = useNavigate()

    const redirect = () => nav(url)

    return (
        <li
            onClick={redirect}
            className={`${styles.appLeftBarDivLiDiv} ${locationNav.pathname == '/' && styles.activeRoute}`}
        >
            {label == 'Home' ?
                <HomeOutlined className={styles.appLeftBarIcons} />
                : label == 'Buscar' ?
                    <SearchOutlined className={styles.appLeftBarIcons} />
                    : label == 'Suas playlists' ?
                        <ProfileOutlined className={styles.appLeftBarIcons} />
                        : ''}
             
            <div style={{ alignSelf: 'center' }}>
                <Typography className={styles.appLeftBarTexts} variant="h6" gutterBottom component="span">
                    {label}
                </Typography>
            </div>
        </li>
    )
}