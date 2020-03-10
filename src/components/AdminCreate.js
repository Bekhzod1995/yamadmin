import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

const { Content } = Layout;

const mapStateToProps = (state) => ({
  admin: state.admins,
});

const actionCreators = {
  getAdminPermissions: actions.getAdminPermissions,
  createAdmin: actions.createAdmin,
}

const AdminCreate = (props) => {
  const {
    form,
    admin,
    getAdminPermissions,
    createAdmin,
  } = props;

  useEffect(() => {
    getAdminPermissions();
  }, []);

  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        createAdmin({
          ...values,
          payload: {
            permissions: values.payload,
          },
        })
      }
    });
  };

  return (
    <Layout>
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Item label="Login" disabled={admin.permissionStatus}>
            {getFieldDecorator('login', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Pasword" disabled={admin.permissionStatus}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Это обязательное поле' }],
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item label="Permissions" disabled={admin.permissionStatus}>
            {getFieldDecorator('payload')(
              <Checkbox.Group>
                {admin.permissions.map((permission) => (
                  <Checkbox value={permission}>{permission}</Checkbox>
                ))}
              </Checkbox.Group>,
            )}
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button onClick={() => props.history.push('/admins/')}>
                Назад
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginLeft: 10 }}
                type="primary"
                htmlType="submit"
                loading={admin.createAdminStatus === 'request'}
              >
                Создать
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Content>
    </Layout>
  );
};

const WrappedForm = Form.create()(AdminCreate);
export default connect(
  mapStateToProps,
  actionCreators,
)(withRouter(WrappedForm));
