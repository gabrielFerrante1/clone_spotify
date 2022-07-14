import { ReactElement, useEffect } from 'react';
import { Player } from '../Player/Player';

import styles from './Layout.module.css';
 
import {
    Divider
} from 'antd';

import {
    Container
} from 'react-bootstrap';
 
import { useDispatch, useSelector } from 'react-redux';
import { setViewPlaylist } from '../../redux/reducers/playerReducer';
import { RootState } from '../../redux/store';
import MusicsPlaylist from '../MusicsPlaylist';
import ItemNav from './ItemNav';

//Types desse componente
type Props = {
    children: ReactElement
}

export const Layout = ({ children }: Props) => {
    const player = useSelector((state: RootState) => state.player); 
    const dispatch = useDispatch(); 

    useEffect(()=>{
        if(player.playlist.length <= 1) {
            dispatch(setViewPlaylist(false))
        }
    }, [player.playlist]);

    return (
        <div className={styles.app}>
            <section className={styles.appLeftBar}> 
                <div className={styles.appLeftBarDivUl}> 
                    <ul>
                        <ItemNav
                            label='Home'
                            url='/'
                        />

                        <ItemNav
                            label='Buscar'
                            url='/search'
                        />
                    
                        <ItemNav
                            label='Suas playlists'
                            url='/playlists'
                        />
                    </ul>

                    <Divider dashed style={{background:'gray',margin:0}} />
                </div>
            </section>

            <section className={styles.appPages}> 
                {children}
            </section>
 
            <section
                style={{ width: player.viewPlaylist ? '470px' : 0 }}
                className={styles.appViewPlaylist}
            >
                <Container style={{padding:'0 10px'}}>
                    <MusicsPlaylist />
                </Container>
            </section>
 
            <section  className={`${styles.appPlayer}`}> 
                <Player />
            </section> 
        </div>
    )
} 