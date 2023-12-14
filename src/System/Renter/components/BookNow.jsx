import React from "react";
import RenterLayout from "./RenterLayout";
import { Descriptions } from "antd";

const team = [
  {
    label: "Car Name:",
    children: "Lamborgni",
  },
];

const BookNow = () => {
  return (
    <RenterLayout>
      <div style={{ display: "flex" }}>
        <div>
          <img
            style={{ borderRadius: "10px" }}
            src="https://static.designboom.com/wp-content/uploads/2016/12/lamborghini-aventador-S-designboom-600.jpg"
            alt=""
          />
        </div>
        <div>
          {/* <Descriptions
            style={{ color: "white" }}
            title="Car Details"
            bordered
            column={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            items={team}
          /> */}
        </div>
      </div>
    </RenterLayout>
  );
};

export default BookNow;
