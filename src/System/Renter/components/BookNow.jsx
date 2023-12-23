import React, { useContext, useEffect, useState } from "react";
import { IoCarSportSharp } from "react-icons/io5";
import { Button, Cascader, DatePicker, Form, Input, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/Auth";
import axios from "axios";
import { UserAddOutlined } from "@ant-design/icons";
import { IoSendOutline } from "react-icons/io5";

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time!",
    },
  ],
};
const residences = [
  {
    value: "karachi",
    label: "Karachi",
    children: [
      {
        label: "Askari ",
        value: "Askari ",
      },

      {
        label: "Bahria Town ",
        value: "Bahria Town ",
      },
      {
        label: "BufferZone",
        value: "BufferZone",
      },
      {
        label: "Cantonment",
        value: "Cantonment",
      },
      {
        label: "Clifton ",
        value: "Clifton ",
      },
      {
        label: "DHA ",
        value: "DHA ",
      },

      {
        label: "F.B Area ",
        value: "F.B Area ",
      },

      {
        label: "F.C Area ",
        value: "F.C Area ",
      },
      {
        label: "Garden ",
        value: "Garden ",
      },

      {
        label: "Soldier Bazaar",
        value: "Soldier Bazaar",
      },
      {
        label: "Gulistan-e-Johar",
        value: "Gulistan-e-Johar",
      },

      {
        label: "Gulshan-e-Iqbal ",
        value: "Gulshan-e-Iqbal ",
      },

      {
        label: "Korangi",
        value: "Korangi",
      },

      {
        label: "Landhi ",
        value: "Landhi ",
      },

      {
        label: "Liaquatabad",
        value: "Liaquatabad",
      },

      {
        label: "Malir",
        value: "Malir",
      },

      {
        label: "Nazimabad",
        value: "Nazimabad",
      },

      {
        label: "North Karachi",
        value: "North Karachi",
      },

      {
        label: "North Nazimabad ",
        value: "North Nazimabad ",
      },

      {
        label: "Rizvia Society",
        value: "Rizvia Society",
      },
      {
        label: "Saddar",
        value: "Saddar",
      },

      {
        label: "P.E.C.H.S",
        value: "P.E.C.H.S",
      },
    ],
  },
];

const BookNow = ({ open, setOpen }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const [data, setData] = useState([{}]);
  const route = useNavigate();
  const { id } = useParams();
  const GetcarByID = async () => {
    try {
      const response = await axios.get(`/carrentals/${id}`);
      if (response.status === 200) {
        console.log("here is the car", response.data);
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetcarByID();
  }, [auth]);

  const onFinish = (fieldsValue) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue["range-picker"];
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const values = {
      ...fieldsValue,
      "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
      "date-time-picker": fieldsValue["date-time-picker"].format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      "month-picker": fieldsValue["month-picker"].format("YYYY-MM"),
      "range-picker": [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
      "range-time-picker": [
        rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
        rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
      ],
      "time-picker": fieldsValue["time-picker"].format("HH:mm:ss"),
    };
    console.log("Received values of form: ", values);
    route("/user/rent/transcript");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (formData.password !== formData.password2) {
    //   alert("Passwords do not match!");
    //   return;
    // }

    // try {
    //   const response = await axios.post("/signup", formData, auth);

    //   if (response.status === 200) {
    //     setAuth(response.data); // Update auth state with the received data
    //     route("/user");
    //     toast.success("Account created :)");
    //   } else if (response.data.error) {
    //     toast.error(response.data.error);
    //   }
    // } catch (error) {
    //   console.error("Error during signup:", error);
    //   toast.error("An error occurred during signup");
    // }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };
  return (
    <>
      <Button
        icon={<IoCarSportSharp />}
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        Book Now
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
          <Form
            name="time_related_controls"
            {...formItemLayout}
            onFinish={onFinish}
            style={{
              maxWidth: 600,
              margin: "auto", // Center the form horizontally
            }}
          >
            <Form.Item
              name="firstname"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Enter your First Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastname"
              label="Last name"
              rules={[
                {
                  required: true,
                  message: "Enter your Last name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cnic"
              label="CNIC No"
              rules={[
                {
                  required: true,
                  message: "Enter your National identity no!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="license"
              label="License No"
              rules={[
                {
                  required: true,
                  message: "Enter your Licence no!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="range-time-picker"
              label="Duration"
              {...rangeConfig}
            >
              <RangePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Select your location!",
                },
              ]}
            >
              <Cascader options={residences} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 16,
                  offset: 8,
                },
              }}
            >
              <Button onClick={handleSubmit} icon={<IoSendOutline />}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default BookNow;
