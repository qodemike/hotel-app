import { FaParking } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { MdLocalAirport } from "react-icons/md";
import { IoLogoNoSmoking } from "react-icons/io";
import { MdPool } from "react-icons/md";
import { FaSpa } from "react-icons/fa";
import { IoMdFitness } from "react-icons/io";
import { MdFamilyRestroom } from "react-icons/md";
import React, { ReactElement, CSSProperties } from "react";

interface IconProps {
  size?: number;
  className?: string;
  children: ReactElement;
}

const Icon: React.FC<IconProps> = ({ size = 20, className, children }) => {
  const styles: CSSProperties = {
    width: size,
    height: size,
  };

  return React.cloneElement(children, {
    className: `icon ${className || ""}`,
    style: { ...styles, ...(children.props.style as CSSProperties) },
  });
};

const hotelFacilities = [
  { name: "Free WiFi", icon: <FaWifi /> },
  { name: "Parking", icon: <FaParking /> },
  { name: "Airport Shuttle", icon: <MdLocalAirport /> },
  { name: "Family Rooms", icon: <MdFamilyRestroom /> },
  { name: "No Smoking", icon: <IoLogoNoSmoking /> },
  { name: "Outdoor Pool", icon: <MdPool /> },
  { name: "Spa", icon: <FaSpa /> },
  { name: "Fitness Center", icon: <IoMdFitness /> },
];

interface Props {
  size?: number;
  facilityName: string;
}

const HotelFacility = ({ facilityName, size = 20 }: Props) => {
  return (
    <>
      {hotelFacilities
        .filter((i) => i.name === facilityName)
        .map((i, index) => (
          <div key={index} className=" flex items-center gap-2 ">
            <span className="">
              <Icon size={size}>{i.icon}</Icon>{" "}
            </span>
            <span className="whitespace-nowrap">{i.name}</span>
          </div>
        ))}
    </>
  );
};

export default HotelFacility;
