import { Button, Modal } from "antd";
import React, { useContext } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/Auth";
import moment from "moment";

const Profile = ({ open, setOpen }) => {
  const [auth] = useContext(AuthContext);

  return (
    <>
      <Modal
        style={{
          color: "white",
        }}
        icon={<FaUser />}
        title="User Profile"
        centered
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        footer={null}
      >
        <div className="space-y-5">
          <div className="border-b pb-2">
            <label className="font-medium text-white">Name</label>
            <p className="mt-2 text-white">{`${auth.FirstName} ${auth.LastName}`}</p>
          </div>
          <div className="border-b pb-2">
            <label className="font-medium text-white">Email</label>
            <p className="mt-2 text-white">{auth.Email}</p>
          </div>
          <div className="border-b pb-2">
            <label className="font-medium text-white">Phone</label>
            <p className="mt-2 text-white">{auth.Phone}</p>
          </div>
          <div className="border-b pb-2">
            <label className="font-medium text-white">Address</label>
            <p className="mt-2 text-white">{auth.Address}</p>
          </div>
          <div className="border-b pb-2">
            <label className="font-medium text-white">Date of Birth</label>
            <p className="mt-2 text-white">
              {moment(auth.DateOfBirth).format("YYYY-MM-DD")}
            </p>
          </div>
          <div className="border-b pb-2">
            <label className="font-medium text-white">
              Driver License Number
            </label>
            <p className="mt-2 text-white">{auth.DriverLicenseNumber}</p>
          </div>
          <div className="border-b pb-2">
            <label className="font-medium text-white">Registration Date</label>
            <p className="mt-2 text-white">
              {moment(auth.RegistrationDate).format("YYYY-MM-DD")}
            </p>
          </div>
          <div className="border-b pb-2">
            <label className="font-medium text-white">Gender</label>
            <p className="mt-2 text-white">{auth.gender || "Not specified"}</p>
          </div>
        </div>
        <Button
          style={{ justifySelf: "end", marginTop: "20px" }}
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </Button>
      </Modal>
    </>
  );
};

export default Profile;
