import { useEffect, useState } from 'react';
import DashboardChart from './DashboardChart';
import api from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummary } from '../../store/features/board/boardSlice';
export default function DashboardSummary() {
  // const [summary, setSummary] = useState({
  //   total: 0,
  //   completed: 0,
  //   active: 0,
  // });
  const dispatch = useDispatch();

  // Redux 상태 가져오기
  const summary = useSelector((state) => state.board.summary);
  const loading = useSelector((state) => state.board.loading);
  const error = useSelector((state) => state.board.error);

  useEffect(() => {
    // const fetchSummary = async () => {
    //   try {
    //     const response = await api.get('/dashboard/summary');
    //     const { total, completed, active } = response.data;

    //     // 서버로부터 받아온 데이터를 상태에 저장
    //     setSummary({
    //       total,
    //       completed,
    //       active,
    //     });
    //   } catch (error) {
    //     console.error('Failed to fetch dashboard summary:', error);
    //   }
    // };

    // fetchSummary();
    dispatch(fetchSummary());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const formatNumber = (number) => String(number).padStart(2, '0');

  return (
    <section style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: 'center', margin: '10px' }}>
          <h3 style={{ marginBottom: '10px' }}>전체 할 일</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {formatNumber(summary.total)}개
          </p>
        </div>
        <div style={{ textAlign: 'center', margin: '10px' }}>
          <h3 style={{ marginBottom: '10px' }}>완료된 할 일</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {formatNumber(summary.completed)}개
          </p>
        </div>
        <div style={{ textAlign: 'center', margin: '10px' }}>
          <h3 style={{ marginBottom: '10px' }}>미완료된 할 일</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {formatNumber(summary.active)}개
          </p>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <DashboardChart
          completionRate={summary.completionRate}
          categories={summary.categories}
        />
      </div>
    </section>
  );
}
