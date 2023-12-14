import React, { useState } from "react";
import signImg from "../Assests/images/loginPg.png";
import { Button, Form, Input, Layout, Modal, Select } from "antd";
import { Option } from "antd/es/mentions";
import logo from "../Assests/images/Logo.png";
import { Link } from "react-router-dom";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";

const Signp = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        style={{
          margin: "10px",
          borderRadius: "100px",
        }}
        icon=<UserAddOutlined />
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Register now
      </Button>
      <Modal open={open} footer={null} onCancel={handleCancel}>
        <div
          style={{
            margin: "10px",
            display: "grid",
            justifyContent: "center",
            borderRadius: "20px",
            color: "white",
            justifyItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              paddingTop: "5px",
              justifyContent: "center",
              justifyItems: "center",
              height: "100px",
            }}
          >
            <img className="logo2" src={logo} />
          </div>
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
              paddingTop: 10,
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please select your address!",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                addonBefore="+92"
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Please select gender!",
                },
              ]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Signp;
