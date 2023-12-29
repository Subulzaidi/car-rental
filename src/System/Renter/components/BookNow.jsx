import React, { useContext, useEffect, useState } from "react";
import { IoCarSportSharp } from "react-icons/io5";
import { Button, Cascader, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/Auth";
import axios from "axios";
import moment from "moment";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentElement, elements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const residences = [
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
];

const BookNow = ({ open, setOpen }) => {
  const [auth] = useContext(AuthContext);
  console.log(auth);
  const [email, setEmail] = useState(auth.user.email);
  const [days, setDays] = useState(0);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    car_id: Number(id),
    email: email,
    cnic: "",
    licenseNumber: "",
    startDate: "",
    endDate: "",
    address: "",
    total_days: days,
  });

  const route = useNavigate();
  useEffect(() => {
    // This useEffect will run whenever days state is updated
    setEmail(auth.user.email);
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = moment(formData.startDate);
    const endDate = moment(formData.endDate);

    // Check if both startDate and endDate are valid dates
    if (startDate.isValid() && endDate.isValid()) {
      const days = endDate.diff(startDate, "days");
      setDays(days); // Update the state if needed

      try {
        console.log(formData);
        const data = await axios.post("/rentcar", {
          car_ID: formData.car_id,
          email: email,
          end_date: moment(formData.endDate).format("YYYY-MM-DD"),
          Start_date: moment(formData.startDate).format("YYYY-MM-DD"),
          address: formData.address,
          Cnic: formData.cnic,
          LicenseNO: formData.licenseNumber,
          total_days: days,
        });

        if (data.status === 200) {
          // route("/user/booking-transcript");
          makePayment();
          console.log("Form data submitted:", formData);
        }
      } catch (err) {
        console.log(err);
        toast.error("An error occurred while submitting the form.");
      }
    }
  };

  const handleCancel = () => {
    setOpen(false);
    console.log(days);
  };

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51OSOx7SFBXwGHscxGmqjo3gRON1QEAb49FfCJEMtKVNomQnt5ng3tFqN8mLEDpMUtiRMtCXAxgU3Spna4xPQwlYR00ngw58lHY"
      );

      const response = await axios.post("/payment", {
        car_ID: formData.car_id,
        email: email,
        end_date: moment(formData.endDate).format("YYYY-MM-DD"),
        Start_date: moment(formData.startDate).format("YYYY-MM-DD"),
        address: formData.address,
        Cnic: formData.cnic,
        LicenseNO: formData.licenseNumber,
        total_days: days,
      });

      const clientSecret = response.data.clientSecret;
      console.log(response.data.clientSecret);
      if (clientSecret) {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(PaymentElement),
          },
        });
        if (result.error) {
          console.error("Error in confirmCardPayment:", result.error);
          // Handle the error appropriately, e.g., show an error message
        } else {
          // Payment succeeded, you can redirect or show a success message
          console.log("Payment succeeded:", result.paymentIntent);
          toast.success("Payment succeeded!");
        }
      } else {
        console.error("Client secret is missing in the response.");
        // Handle the error appropriately, e.g., show an error message
      }
    } catch (error) {
      console.error("Error in makePayment:", error);
      // Handle the error appropriately, e.g., show an error message
    }
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
          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridRowGap: "10px",
            }}
          >
            {/* Renter Information */}

            <div>
              <label>Pickup Date:</label>
              <input
                type="date"
                name="startDate"
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  color: "black",
                  borderRadius: "5px",
                  width: "100%",
                }}
                value={formData.startDate}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")} // Set min to the current date
                required
              />
            </div>
            <div>
              <label>Dropoff Date:</label>
              <input
                type="date"
                name="endDate"
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  color: "black",
                  borderRadius: "5px",
                  width: "100%",
                }}
                value={formData.endDate}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")} // Set min to the current date
                required
              />
            </div>

            <div>
              <label>CNIC:</label>
              <input
                type="text"
                name="cnic"
                style={{
                  padding: "8px",
                  border: "1px solid #ccc",
                  color: "black",
                  borderRadius: "5px",
                  width: "100%",
                }}
                value={formData.cnic}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>License Number:</label>
              <input
                type="text"
                name="licenseNumber"
                style={{
                  padding: "8px",
                  color: "black",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "100%",
                }}
                value={formData.licenseNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Rental Period */}
            <div>
              <label>Address:</label>
              <Cascader
                options={residences}
                style={{
                  width: "100%",
                  padding: "8px",
                  background: "white",
                  // border: "1px solid #ccc",
                  // borderRadius: "5px",
                }}
                placeholder="Select Address"
                onChange={(value) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    address: value,
                  }));
                }}
              />
            </div>
            <button
              className="ant-btn "
              style={{ width: "100px", height: "35px", borderRadius: "5px" }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default BookNow;
