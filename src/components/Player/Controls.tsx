import styles from './Player.module.css';

import { message } from 'antd';
import {
    Col, Row
} from 'react-bootstrap';

import {
    useEffect,
    useState
} from "react";

import { useDispatch, useSelector } from 'react-redux';
import { setIsPlayingTrack, setResetAudioOnAlterationPlaylist } from '../../redux/reducers/playerReducer';
import { RootState } from '../../redux/store';
import { ControlsOptions } from './ControlsOptions';
import ControlsPlayerSlider from './ControlsPlayer';
import ControlsPlayerCenter from './ControlsPlayerCenter';

export const Controls = () => {
    const player = useSelector((state: RootState) => state.player);
    const dispatch = useDispatch();

    const [valueVolume, setValueVolume] = useState<number>(100);
    const [valueTime, setValueTime] = useState<number>(0);
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLoop, setIsLoop] = useState<boolean>(false);
    const [nextAudioAutomatic, setNextAudioAutomatic] = useState<number>(0);
 
    audio?.addEventListener('timeupdate', () => {
        let result = 0
        if (audio != undefined) {
            result = audio.duration - audio.currentTime;
            setValueTime(audio.currentTime);
        }

        if (player.playlist.length < 1) {
            if (result == 0) {
                setIsPlaying(false);
                setValueTime(0);
            }
        } else {
            if (!isLoop) {
                if (result <= 1.5 && nextAudioAutomatic == 0) {
                    setNextAudioAutomatic(1);
                }
            }
        }
    });

    const alterTrack = (type: string) => {
        const count: number = player.playlist.length;
        const result: number = player.isPlaying - 1;
        const result2: number = player.isPlaying + 1;

        if (type == 'voltar') {
            if (result >= 0 && result < count) {
                setValueTime(0);
                setIsPlaying(true);
                audio?.pause();

                dispatch(setIsPlayingTrack(result));
            } else {
                message.info('N??o h?? mais m??sicas nesta playlist', 2);
            }
        } else if (type == 'proxima') {
            if (result2 >= 0 && result2 < count) {
                setValueTime(0);
                setIsPlaying(true);
                audio?.pause();

                dispatch(setIsPlayingTrack(result2));
            } else {
                message.info('N??o h?? mais m??sicas nesta playlist', 2);
            }
        }
    }

    useEffect(() => {
        if (player.resetAudioOnAlterationPlaylist) {
            if (audio != undefined) audio.pause()
            
            setAudio(new Audio(player.playlist.length > 0 && player.isPlaying >= 0 ?
                    player.playlist[player.isPlaying].path
                    :
                ''));
            
            if (audio != undefined) setIsPlaying(true)
        } else {
            dispatch(setResetAudioOnAlterationPlaylist(true))
        }

    }, [player.playlist, player.isPlaying]);

    useEffect(() => {
        if (audio != undefined) {
            audio.autoplay = true;
            audio.volume = valueVolume / 100;
            audio.loop = isLoop;

            setNextAudioAutomatic(0);
        }
    }, [audio]);

    useEffect(() => {
        if (nextAudioAutomatic == 1) {
            if (!isLoop) {
                const result2: number = player.isPlaying + 1;
                const count: number = player.playlist.length
                if (count > 0 && result2 >= 0 && result2 < count) {
                    setIsPlaying(true);
                    setValueTime(0);

                    alterTrack('proxima')
                } else {
                    setIsPlaying(false);
                    setValueTime(0);
                }

            } else {
                setNextAudioAutomatic(0);
            }

        }
    }, [nextAudioAutomatic]);

    return (
        <Row >
            <Col md={8}>
                <div className={styles.audioControls}>
                    <div className='d-flex'>
                        <ControlsPlayerCenter
                            audio={audio}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            setValueTime={setValueTime}
                            alterTrack={alterTrack}
                        />
                    </div>

                    <ControlsPlayerSlider
                        audio={audio}
                        valueTime={valueTime}
                        setValueTime={setValueTime}
                    />
                </div>
            </Col>

            <Col offset={2}>
                <div className={styles.controlMoreOptions}>
                    <ControlsOptions
                        audio={audio as HTMLAudioElement}
                        setLoop={setIsLoop}
                        loop={isLoop}
                        setVolume={setValueVolume}
                        volume={valueVolume}

                    />
                </div>
            </Col>
        </Row>
    )
}