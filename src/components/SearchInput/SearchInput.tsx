import styles from './SearchInput.module.css'; 

import { 
    SearchOutlined,
    CloseOutlined
} from '@ant-design/icons'; 
import { useNavigate } from 'react-router-dom';
import { ChangeEvent } from 'react'; 

export const SearchInput = () => {
    const router = useNavigate();

    const setQueryString = (e: ChangeEvent<HTMLInputElement>) => {
        router(`/search/${e.target.value}`);
        /*
        router.push({
            pathname: router.pathname,
            query: {
                query: e.target.value
            },
            
        }, undefined, {scroll: false}); */
    }

    const clearQueryString = () => {
        /* 
        router.push({
            pathname: router.pathname
        });
        */
    }

    return (  
        <div className={styles.searchInputContent}>
            <SearchOutlined style={{fontSize:'18px',color:'black'}}/>
            
            {/*
            <input 
                value={router.query.query != undefined ? router.query.query.toString() : ''}
                onChange={setQueryString} placeholder='Pesquisar por músicas e playlists' 
                type="search"
            />

            <CloseOutlined onClick={clearQueryString} hidden={router.query.query == undefined || router.query.query == ''} style={{fontSize:'18px',color:'black'}}/>
            */}
        
        </div>
    )
}