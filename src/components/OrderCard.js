import React, { useState } from 'react';
import {
  Card,
  Icon,
  // Statistic,
  Popover,
  Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';

const { Meta } = Card;

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const activeOrders = useSelector((state) => state.activeOrders);

  const [visible, setVisible] = useState(false);
  // const deadline = new Date(order.created_at).getTime() + 1000 * 60 * 60 * 10;

  const handleAccept = async () => {
    await dispatch(actions.acceptOrder(order.id));
    setVisible(false);
  }
  const handleСancel = async () => {
    await dispatch(actions.cancelOrder(order.id));
    setVisible(false);
  };


  const displayContent = () => {
    switch (activeOrders.activeTabKey) {
      case 2:
        return (
          <Button
            type="danger"
            onClick={handleСancel}
            loading={activeOrders.cancelStatus === 'request'}
          >
            Отменить
          </Button>
        );
      default:
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              type="primary"
              onClick={handleAccept}
              loading={activeOrders.acceptStatus === 'request'}

            >
              Принять
            </Button>
            <Button
              type="danger"
              onClick={handleСancel}
              loading={activeOrders.cancelStatus === 'request'}
            >
              Отменить
            </Button>
          </div>
        );
    }
  }

  const formattingTime = (time) => {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  }

  const dispalyTime = (date) => {
    const time = new Date(date);
    return `
      ${time.toLocaleDateString()} ${formattingTime(time.getHours())}:${formattingTime(time.getMinutes())}:${formattingTime(time.getSeconds())}
    `
  }

  return (
    <Card
      style={{
        width: 300,
        margin: 10,
        border: '1px solid red',
        maxHeight: 'auto',
      }}
      actions={[
        <Icon style={{ border: '1px solid blue' }} type="eye" onClick={() => window.open(`/orders/${order.id}/`, '_blank')} />,
        <Popover
          style={{ bottom: 0 }}
          title="Действия"
          trigger="click"
          visible={visible}
          onVisibleChange={(visibility) => setVisible(visibility)}
          content={displayContent()}
          overlayStyle={{
            textAlign: 'center',
            width: 250,
          }}
        >
          <Icon type="ellipsis" style={{ border: '1px solid green' }} />
        </Popover>,
      ]}
      bodyStyle={{ border: '1px solid yellow' }}
      actionsStyle={{ border: '1px solid purple' }}
    >
      <Meta
        title={`# ${order.id}`}
        style={{ border: '1px solid purple' }}
      />
      {order.name === null ? null : (
        <div>
          <br />
            😃
          {order.name}
        </div>
      )}
      {order.phone === null ? null : `📞 +${order.phone}`}
      {order.rider_name === null ? null : (
        <div>
          <br />
          🚲
          {order.rider_name}
        </div>
      )}
      {order.rider_phone === null ? null : `📱 ${order.rider_phone}`}
      {order.total_sum === null ? null : (
        <div>
          <br />
          💰
          {order.total_sum.toLocaleString('ru')}
          сум
        </div>
      )}
      {order.kitchen === null ? null : `🏠 ${order.kitchen}`}
      {order.comment === null ? null : (
        <p>
          💬
          {order.comment}
        </p>
      )}
      <br />
      ⏲
      {dispalyTime(order.created_at)}
    </Card>
  )
};

export default OrderCard;
