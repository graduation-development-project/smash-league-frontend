'use client';

import { Card, Col, Row } from 'antd';

const AdminCard = () => {
  return (
    <Row gutter={16} style={{ fontFamily: 'inherit' }}>
      <Col span={8}>
        <Card title="Number Of Users">Card content</Card>
      </Col>
      <Col span={8}>
        <Card title="Number Of Tournaments">Card content</Card>
      </Col>
      <Col span={8}>
        <Card title="Number Of Transactions">Card content</Card>
      </Col>
    </Row>
  );
};

export default AdminCard;
