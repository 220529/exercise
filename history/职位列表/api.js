/*
 * @Author: liukaixin
 * @Date: 2023-03-23 17:04:16
 * @LastEditors: liukaixin
 * @LastEditTime: 2023-03-27 14:33:35
 * @Description: 职位组件测试
 */
import { useEffect, useState } from 'react';
import { View, Button } from '@tarojs/components';
import Navbar from '@components/common/navbar/index';
import * as api from '@/service/position/api';
import * as api2 from '@/service/company/api';
import './index.less';

import { connect } from 'react-redux';
import { useLoginDialogComp, useLoginWithPhoneComp } from '@components/common/login/hooks/useLogin';

const positionId = 6801418;
const companyId = 62;

const Position = ({ auth }) => {
  const { LoginDialogComp, setShowLoginWay } = useLoginDialogComp({ title: '测试', isHideClose: false });
  // console.log('auth', auth);
  const fetchLitePositions = async () => {
    const res = await api.fetchLitePositions({ pageNo: 1 });
    console.log('fetchLitePositions.res', res);
  };
  const [expects, setExpects] = useState([]);
  const fetchExpectList = async () => {
    const res = await api.fetchExpectList();
    console.log('fetchExpectList.res', res);
    setExpects(res);
  };
  const [positions, setPositions] = useState<PositionModel[]>([]);
  const fetchRecommend = async () => {
    const res = await api.fetchRecommend({ pageNo: 1, pageSize: 10, jobId: expects[0].id });
    console.log('fetchRecommend.res', res);
    setPositions(res.result);
  };
  const fetchPositionMark = async () => {
    const res = await api.fetchPositionMark({
      positionIds: positions.map(i => i.id).filter(i => i),
    });
    console.log('fetchRecommend.res', res);
  };
  const fetchPositionByParams = async () => {
    const res = await api.fetchPositionByParams({ keyword: '公务', city: '天津', pageNo: 1, pageSize: 10, sort: 'TIME' });
    console.log('fetchPositionByParams.res', res);
  };
  const fetchPosition = async () => {
    const res = await api.fetchPosition({
      positionId,
      isCInspectB: 1,
    });
    console.log('fetchPosition.res', res);
  };
  const fetchPositionDelivery = async () => {
    const res = await api.fetchPositionDelivery(positionId);
    console.log('fetchPositionDelivery.res', res);
  };
  const fetchRecPositionsForJd = async () => {
    const res = await api.fetchRecPositionsForJd(positionId);
    console.log('fetchRecPositionsForJd.res', res);
  };
  const fetchHotWorlds = async () => {
    const res = await api.fetchHotWorlds();
    console.log('fetchHotWorlds.res', res);
  };
  const fetchHotCompany = async () => {
    const res = await api.fetchHotCompany('北京');
    console.log('fetchHotCompany.res', res);
  };
  const fetchCompanyByParams = async () => {
    const res = await api2.fetchCompanyByParams({ keyword: '字节跳动', pageNo: 1, pageSize: 10 });
    console.log('fetchCompanyByParams.res', res);
    const res2 = await api2.fetchCompany(companyId);
    console.log('fetchCompany.res', res2);
    const res3 = await api2.fetchCompanyJobSummary(companyId);
    console.log('fetchCompanyJobSummary.res', res3);
    const res4 = await api2.fetchCompanyJob(companyId, {
      category: 'ALL',
      pageNo: 1,
      pageSize: 10,
      city: '',
      sort: 'REAL_TIME',
    });
    console.log('fetchCompanyJob.res', res4);
  };
  const positionCollectAdd = async () => {
    const res = await api.positionCollectAdd({ positionId });
    console.log('positionCollectAdd.res', res);
  };
  const positionCollectDelete = async () => {
    const res = await api.positionCollectDelete({ positionId });
    console.log('positionCollectDelete.res', res);
  };
  const { LoginWithPhoneComp } = useLoginWithPhoneComp();
  const fetchPositionRelationAndTag = async () => {
    const res = await api.fetchPositionRelationAndTag();
    console.log('fetchPositionRelationAndTag.res', res);
  };
  const fetchTagRelation = async () => {
    const res = await api.fetchTagRelation({ secondCode: 201101, threeCode: 201101101 });
    console.log('fetchTagRelation.res', res);
  };
  const fetchCity = async () => {
    const res = await api.fetchCity();
    console.log('fetchCity.res', res);
  };
  useEffect(() => {
    fetchPositionRelationAndTag();
    fetchTagRelation();
    fetchCity()
  }, []);
  return (
    <>
      <Navbar>职位</Navbar>
      <View className="index-wrapper">
        <LoginWithPhoneComp>登录</LoginWithPhoneComp>
        {/* <Button
          onClick={() => {
            setShowLoginWay(true);
          }}
        >
          登录
        </Button> */}
        <Button onClick={fetchPositionByParams}>关键字搜索</Button>
        <Button onClick={fetchLitePositions}>未登录职位列表</Button>
        <Button onClick={fetchExpectList}>期望职位列表</Button>
        {expects.length ? <Button onClick={fetchRecommend}>职位列表</Button> : null}
        {expects.length ? <Button onClick={fetchPositionMark}>职位列表类型标签</Button> : null}
        <Button onClick={fetchPosition}>职位详情</Button>
        <Button onClick={fetchPositionDelivery}>职位投递状态</Button>
        <Button onClick={fetchRecPositionsForJd}>公司其他职位</Button>
        <Button onClick={fetchHotWorlds}>猜你喜欢</Button>
        <Button onClick={fetchHotCompany}>热门公司</Button>
        <Button onClick={fetchCompanyByParams}>查询公司</Button>
        <Button onClick={positionCollectAdd}>收藏职位</Button>
        <Button onClick={positionCollectDelete}>取消收藏职位</Button>
      </View>
      <LoginDialogComp />
    </>
  );
};

// export default Position;
const mapState = state => {
  return { auth: state.auth };
};
const mapDispatch = state => {
  return {};
};
export default connect(mapState, mapDispatch)(Position);
