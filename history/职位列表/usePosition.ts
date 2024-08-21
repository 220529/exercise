import { useState } from 'react';
import * as api from '@/service/position/api';
import { useRequest } from 'taro-hooks';

const usePage = () => {
  const [pageInfo, setPageInfo] = useState<{
    pageNo: number;
    pageSize: number;
    // 总页数
    totalPageCount?: number | null;
    // 总条数
    totalCount?: number | null;
    // 是否有下一页
    hasNextPage?: boolean;
  }>({
    pageNo: 1,
    pageSize: 10,
    totalCount: null,
    totalPageCount: null,
    hasNextPage: true,
  });
  // @ts-ignore
  const updatePageInfo = res => {
    setPageInfo({
      ...pageInfo,
      pageNo: res.hasNextPage ? pageInfo.pageNo + 1 : pageInfo.pageNo,
      hasNextPage: res.hasNextPage,
      totalCount: res.totalCount,
      totalPageCount: res.totalPageCount,
    });
  };
  const pageReset = () => {
    setPageInfo({ pageNo: 1, pageSize: 10, hasNextPage: true });
  };
  return { pageInfo, updatePageInfo, pageReset };
};

// 获取职位的标签
const getPositionsMark = async (positions: PositionModel[]) => {
  if (positions?.length) {
    // 先筛掉不是职位的数据
    positions = positions.filter((i: PositionModel) => i.id);
    // 职位标签，如：猎头、直招等。
    const markRes = await api.fetchPositionMark({ positionIds: positions.map((i: PositionModel) => i.id).filter((i: number) => i) });
    if (markRes?.positionMarks?.length) {
      markRes.positionMarks.forEach(item => {
        const target = positions.find((i: PositionModel) => i.id === item.positionId);
        Object.keys(item).forEach(key => {
          // @ts-ignore
          target[key] = item[key];
        });
      });
    }
  }
  return positions;
};

/**
 * 未登录职位列表
 */
export const usePositionsNoLogin = () => {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState<PositionModel[]>([]);
  const { pageInfo, updatePageInfo, pageReset } = usePage();

  const fetchPositions = async (params: RecommendApi.Props) => {
    // 是否还有下一页
    if (pageInfo.hasNextPage) {
      setLoading(true);
      // @ts-ignore
      const curParams = { pageNo: pageInfo.pageNo, pageSize: pageInfo.pageSize, ...params };
      const res = await api.fetchLitePositions(curParams);
      updatePageInfo(res);
      setLoading(false);
      setPositions(positions.concat(res.result || []));
    }
  };

  const reset = () => {
    setPositions([]);
    pageReset();
  };

  return {
    reset,
    loading,
    hasNextPage: pageInfo.hasNextPage,
    positions,
    fetchPositions,
  };
};

/**
 * 已登录职位列表
 */
export const usePositions = () => {
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState<PositionModel[]>([]);
  const { pageInfo, updatePageInfo, pageReset } = usePage();

  const fetchPositions = async (params: RecommendApi.Props) => {
    // 是否还有下一页
    if (pageInfo.hasNextPage) {
      setLoading(true);
      // @ts-ignore
      const curParams = { pageNo: pageInfo.pageNo, pageSize: pageInfo.pageSize, ...params };
      const res = await api.fetchRecommend(curParams);
      updatePageInfo(res);
      const items = await getPositionsMark(res.result);
      setLoading(false);
      setPositions(positions.concat(items || []));
    }
  };

  const reset = () => {
    setPositions([]);
    pageReset();
  };

  return {
    reset,
    loading,
    hasNextPage: pageInfo.hasNextPage,
    positions,
    fetchPositions,
  };
};
