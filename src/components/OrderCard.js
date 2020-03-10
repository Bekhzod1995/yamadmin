import React, { useState } from 'react';
import {
  Card,
  Icon,
  Statistic,
  Popover,
  Button,
} from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

const actionCreators = {
  acceptOrder: actions.acceptOrder,
}

const mapStateToProps = (state) => ({
  activeOrders: state.activeOrders,
});


const { Meta } = Card;
const { Countdown } = Statistic;

const OrderCard = ({
  order,
  acceptOrder,
  activeOrders,
}) => {
  const [visible, setVisible] = useState(false);
  const deadline = new Date(order.created_at).getTime() + 1000 * 60 * 60 * 10;

  const handleAccept = async () => {
    await acceptOrder(order.id);
    setVisible(false);
  };


  const content = (
    <div>
      <Button
        type="primary"
        onClick={handleAccept}
        loading={activeOrders.acceptStatus === 'request'}

      >
          Принять
      </Button>
      <Button
        type="primary"
      >
          Отменить
      </Button>
    </div>
  );

  return (
    <Card
      style={{ width: 300, margin: 10 }}
      actions={[
        <Icon type="eye" onClick={() => window.open(`/orders/${order.id}/`, '_blank')} />,
        <Popover
          title="Принять или удалить заказ?"
          trigger="click"
          visible={visible}
          onVisibleChange={(visibility) => setVisible(visibility)}
          content={content}
        >
          <Icon type="ellipsis" />
        </Popover>,
      ]}
    >
      <Meta
        title={`# ${order.id}`}
      />
      <br />
      😃
      <strong>{order.name}</strong>
      <br />
      📞+
      {order.phone}
      <br />
      <br />


      💰
      {order.total_sum.toLocaleString('ru')}
      сум
      <br />
      💬
      {order.comment}
      <br />
      <br />
      <Countdown prefix="⏱️" value={deadline} format="mm:ss" />
    </Card>
  )
};

export default connect(
  mapStateToProps,
  actionCreators,
)(withRouter(OrderCard));
