import { useEffect } from 'react';
import { View, Text, Image, RootPortal } from '@tarojs/components';
import Taro, { useReachBottom } from '@tarojs/taro';
import { usePositions, usePositionsNoLogin } from '@/hooks/usePosition';
import Position from '../position';
import './index.less';

import { useModal, useApp } from 'taro-hooks';

const jobId = 1979901269;
// const jobId = 15926479;
const Positions = () => {
  const { loading, hasNextPage, positions, fetchPositions } = usePositions({ jobId });
  const fetchData = () => fetchPositions({ jobId });
  useEffect(() => {
    fetchData();
  }, []);
  useReachBottom(() => {
    fetchData();
  });
  return (
    <View className='positions'>
      {positions.map((item: PositionModel) => (
        <Position item={item} key={item.id} />
      ))}
      {loading ? (
        <View className='loading'>
          <Image src='https://lagou-zhaopin-fe.lagou.com/fed/lg-wxverser-fed/loading.gif' alt='' />
          <Text>正在加载...</Text>
        </View>
      ) : null}
      {!loading && !hasNextPage ? (
        <View className='no-more'>
          <Text>没有更多了</Text>
        </View>
      ) : null}
    </View>
  );
};
export default Positions;
