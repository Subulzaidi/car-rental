import React from "react";
import RenterLayout from "./components/RenterLayout";
import Search from "antd/es/input/Search";
import {  Button} from "antd";
import { useNavigate } from "react-router-dom";

const team = [
  {
      avatar: "https://static.designboom.com/wp-content/uploads/2016/12/lamborghini-aventador-S-designboom-600.jpg",
      name: "Lamborgni",
      title: "Mr XYZ",
      desc: "Rs.60000/Day",
    
  },
  {
      avatar: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnN8ZW58MHx8MHx8fDA%3D",
      name: "Mercedes",
      title: "Mr John",
      desc: "Rs.75000/Day",
      
  },
  {
      avatar: "https://images.unsplash.com/photo-1625231334168-35067f8853ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8",
      name: "BMW",
      title: "Mr. Elijah",
      desc: "Rs.65000/hr",
      
  },
  {
      avatar: "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFtYm9yZ2hpbml8ZW58MHx8MHx8fDA%3D",
      name: "Lamborgni",
      title: "Mr. John",
      desc: "Rs.65000/Day",
      
  },  
  {
    avatar: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNhcnN8ZW58MHx8MHx8fDA%3D",
    name: "Mercedes",
    title: "Mr John",
    desc: "Rs.75000/Day",
    
},
{
  avatar: "https://static.designboom.com/wp-content/uploads/2016/12/lamborghini-aventador-S-designboom-600.jpg",
  name: "Lamborgni",
  title: "Mr XYZ",
  desc: "Rs.60000/Day",

},
]


const Renter = () => {
    const route = useNavigate();
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <RenterLayout>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="mt-12">
                    <ul className="grid gap-8 lg:grid-cols-2">
                        {
                            team.map((item, idx) => (
                                <li key={idx} className="gap-8 sm:flex">
                                    <div className="w-full h-full">
                                        <img
                                            src={item.avatar}
                                            className="w-full h-full object-cover object-center shadow-md rounded-xl"
                                            alt=""
                                        />
                                    </div>
                                    <div className="mt-4 sm:mt-0">
                                        <h4 className="text-lg text-white-700 font-semibold">{item.name}</h4>
                                        <p className="text-indigo-600">{item.title}</p>
                                        <p className="text-white-600 mt-2">{item.desc}</p>
                                        <div className="mt-3 flex gap-2 text-gray-400">
                                            <Button onClick={()=>{route("/user/rent")}}>Book Now</Button>
                                            <Button>Details</Button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    </RenterLayout>
  );
};
export default Renter;
