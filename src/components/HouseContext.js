import React, { useState, createContext, useEffect } from "react";

//import data
import { housesData } from "../data";

//create context
export const HouseContext = createContext();

//provider
const HouseContextProvider = ({ children }) => {
	const [houses, setHouses] = useState(housesData);
	const [country, setCountry] = useState("location (any)");
	const [countries, setCountries] = useState([]);
	const [property, setProperty] = useState("Property tpye(any)");
	const [properties, setProperties] = useState([]);
	const [price, setPrice] = useState("Price range (any)");
	const [loading, setLoading] = useState(false);

	//return all countries
	useEffect(() => {
		const allCountries = houses.map((house) => {
			return house.country;
		});

		//remove duplicates
		const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

		//set countries state
		setCountries(uniqueCountries);
	}, []);

	//return all properties
	useEffect(() => {
		const allProperties = houses.map((house) => {
			return house.type;
		});

		//remove duplicates
		const uniqueProperties = ["Location (any)", ...new Set(allProperties)];

		//set properties state
		setProperties(uniqueProperties);
	}, []);

	const handleClick = () => {
		console.log(country, property, price);

		//create a function that checks if the string includes 'any'

		const isDefault = (str) => {
			return str.split(" ").includes("(any)");
		};

		console.log(isDefault(country));
		console.log(price);

		//get first value of price and parse it to number
		const minPrice = parseInt(price.split(" ")[0]);
		// get second value of price which is the maximum price & parse it to number
		const maxPrice = parseInt(price.split(" ")[2]);
		console.log(maxPrice);

		const newHouses = housesData.filter((house) => {
			const housePrice = parseInt(house.price);

			if (house.country === country && house.type === property && housePrice >= minPrice )
		});
	};

	return (
		<HouseContext.Provider
			value={{
				country,
				setCountry,
				countries,
				setCountries,
				property,
				setProperty,
				properties,
				setProperties,
				price,
				setPrice,
				houses,
				setHouses,
				loading,
				setLoading,
				handleClick,
			}}
		>
			{children}
		</HouseContext.Provider>
	);
};

export default HouseContextProvider;
