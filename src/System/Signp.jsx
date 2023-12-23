import React, { useContext, useEffect,useState } from "react";
import { AuthContext } from ".././context/Auth";
import { Button, Form, Input, Layout, Modal, Select } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import axios from "axios";
import toast from "react-hot-toast";
import { IoSendOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from "../Assests/images/Logo.png";

const Signp = ({ open, setOpen }) => {
  const route = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    address: "",
    phoneNo: "",
    gender: "",
  });
  const [auth,setAuth] = useContext(AuthContext);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("/signup", formData, auth);

      if (response.status === 200) {
        setAuth(response.data); // Update auth state with the received data
        route("/user");
        toast.success("Account created :)");
      } else if (response.data.error) {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("An error occurred during signup");
    }
  };
  useEffect(() => {
    // if (auth && auth?.token) {
    //   router("/");
    // }
  }, [auth, route]);
  return (
    <>
      <Button
        style={{
          margin: "10px",
          borderRadius: "100px",
        }}
        icon={<UserAddOutlined />}
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
          <div style={{ justifyContent: "center" }}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1"> Email</label>
                  <Input
                    type="email"
                    style={{ border: "none" }}
                    placeholder="example@gmail.com "
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1">Name</label>
                  <Input
                    type="text"
                    style={{ border: "none" }}
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1"> Password</label>
                  <Input
                    type="password"
                    style={{ border: "none" }}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1">Confirm Password</label>
                  <Input
                    type="password"
                    style={{ border: "none" }}
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1"> Address</label>
                  <Input
                    type="address"
                    style={{ border: "none" }}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label for="exampleFormControlInput1">Phone No</label>
                  <Input
                    type="PhoneNo"
                    style={{ border: "none" }}
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group py-2">
                  <label>
                    Gender<span className="text-danger">*</span>
                  </label>
                  <select
                    required
                    value={formData.gender}
                    name="gender"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      color: "black",
                      background: "white",
                    }}
                    className="form-select"
                  >
                    <option value="">Choose</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group py-2"></div>
              </div>
            </div>

            <Button
              className="clicks mt-3"
              onClick={handleSubmit}
              icon={<IoSendOutline />}
            >
              Submit
            </Button>
          </div>{" "}
        </div>
      </Modal>
    </>
  );
};

export default Signp;
