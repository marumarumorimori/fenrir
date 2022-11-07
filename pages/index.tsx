import { useState } from 'react';
import Link from 'next/link';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/router';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components';

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


export default function Home() {
  const [range, setRange] = useState<number>(3);
  const router = useRouter();
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <SearchBox>
          <Select
            onChange={(event: SelectChangeEvent) => {
              setRange(parseInt(event.target.value));
            }}
            value={`${range}`}
            label='半径'
          >
            <MenuItem value={1}>300m</MenuItem>
            <MenuItem value={2}>500m</MenuItem>
            <MenuItem value={3}>1000m </MenuItem>
            <MenuItem value={4}>2000m</MenuItem>
            <MenuItem value={5}>3000m</MenuItem>
          </Select>
          <button
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  router.push({
                    pathname: '/list', query: {
                      range: range,
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    }
                  })
                },
                () => {
                  console.log('位置情報の取得に失敗しました。');
                },
              );
            }}
          >
            検索する
          </button>
        </SearchBox>

      </main>
    </div>
  )
}
