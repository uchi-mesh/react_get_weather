import {
  Box,
  Button,
  HStack,
  Select,
  Table,
  Image,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface Position {
  lat: number;
  long: number;
}

interface Weather {
  id: number;
  date: string;
  icon: string;
  temp: number;
}

const Home = () => {
  const [position, setPosition] = useState<Position>({
    lat: 0,
    long: 0,
  });
  const [weather, setWeather] = useState<Weather[]>([]);

  //* 緯度経度による天気情報取得
  useEffect(() => {
    const getWeatherDataByGEO = async () => {
      await fetch(
        `http://api.openweathermap.org/data/2.5/onecall?lat=${position.lat}&lon=${position.long}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          //* 取得した1時間ごとのデータをStateに設定
          const hourly = result.hourly;

          const _weather: Weather[] = [];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          hourly.forEach((weatherData: any) => {
            _weather.push({
              id: weatherData.dt,
              date: dayjs.unix(weatherData.dt).format('YYYY/MM/DD HH:mm'),
              icon: weatherData.weather[0].icon,
              temp: weatherData.temp,
            });
          });

          setWeather(_weather);
        });
    };
    if (position.lat && position.long) getWeatherDataByGEO();
  }, [position]);

  //* 現在位置情報の取得
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ lat: latitude, long: longitude });
      },
      (error) => {
        console.log(error);
        console.log('位置情報が使えません。');
      }
    );
  };

  //* 代表地点選択
  const selectPlace = (position: string) => {
    const latitude = Number(position.split(',')[0]);
    const longitude = Number(position.split(',')[1]);
    setPosition({ lat: latitude, long: longitude });
  };
  // あああ
  return (
    <>
      <HStack>
        <Select onChange={(e) => selectPlace(e.target.value)}>
          <option value="35.7100069,139.8108103">東京スカイツリー</option>
          <option value="35.1859476,136.9474047">バンテリンドーム</option>
        </Select>
        <Button onClick={getCurrentLocation}>現在地点</Button>
      </HStack>
      <Box>
        <HStack>
          <Text>緯度：{position.lat}</Text>
          <Text>経度：{position.long}</Text>
        </HStack>
      </Box>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>日時</Th>
              <Th>天気</Th>
              <Th>気温</Th>
            </Tr>
          </Thead>
          <Tbody>
            {weather.map((w) => {
              return (
                <Tr key={w.id}>
                  <Td>{w.date}</Td>
                  <Td>
                    <Image
                      src={`http://openweathermap.org/img/w/${w.icon}.png`}
                    />
                  </Td>
                  <Td>{w.temp}℃</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default Home;
