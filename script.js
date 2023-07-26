//get data
const fetchData = async () => {
	try {
		const response = await fetch(
			"https://gx.pandora.caps.pl/zadania/api/offers2023.json"
		);
		const data = await response.json();
		return data.offers;
	} catch (error) {
		console.error("Error: ", error);
	}
};

const getMonth = (pdd) => {
	if (pdd.slice(5, 7) === "01") {
		return "styczeń ";
	} else if (pdd.slice(5, 7) === "02") {
		return "luty ";
	} else if (pdd.slice(5, 7) === "03") {
		return "marzec ";
	} else if (pdd.slice(5, 7) === "04") {
		return "kwiecień ";
	} else if (pdd.slice(5, 7) === "05") {
		return "maj ";
	} else if (pdd.slice(5, 7) === "06") {
		return "czerwiec ";
	} else if (pdd.slice(5, 7) === "07") {
		return "lipiec ";
	} else if (pdd.slice(5, 7) === "08") {
		return "sierpień ";
	} else if (pdd.slice(5, 7) === "09") {
		return "wrzesień ";
	} else if (pdd.slice(5, 7) === "10") {
		return "październik ";
	} else if (pdd.slice(5, 7) === "11") {
		return "listopad ";
	} else if (pdd.slice(5, 7) === "12") {
		return "grudzień ";
	}
};

//render vehicles
const renderVehicleList = (vehicles) => {
	const vehicleList = document.getElementById("vehicleList");
	vehicleList.innerHTML = "";

	vehicles.forEach((vehicle) => {
		const card = document.createElement("div");
		card.classList.add("vehicleCard");

		const img = document.createElement("img");
		img.src = vehicle.offer_details.image_paths.front;

		const title = document.createElement("h2");
		title.textContent = vehicle.offer_details.model_details;

		const subTitle = document.createElement("h3");
		subTitle.textContent = vehicle.offer_details.kabina.toUpperCase();

		const availability = document.createElement("h3");
		availability.textContent = !!vehicle.in_stock
			? "Dostępny od ręki!"
			: "Przewidywana data dostawy: " +
			  getMonth(vehicle.pdd) +
			  vehicle.pdd.slice(0, 4) +
			  "*";

		const productionYear = document.createElement("div");
		productionYear.innerHTML = `<div>Rok produkcji:</div> <div> ${vehicle.pyear}</div>`;

		const gear = document.createElement("div");
		gear.innerHTML = `<div>Skrzynia: </div>
			${
				vehicle.offer_details.skrzynia_automatyczna
					? "<div>Automatyczna</div>"
					: "<div>Manualna</div>"
			}`;

		const city = document.createElement("div");
		city.innerHTML = `<div>Miasto: </div> <div>${vehicle.miasto}</div>`;

		const price = document.createElement("div");
		const priceNet = vehicle.car_price_disc.toString();
		price.innerHTML = `<div>Cena netto: </div> <div class="price">
		${priceNet.slice(-6, -3)} ${priceNet.slice(-3)}  <span> zł</span></div>`;

		const priceTotal = document.createElement("div");
		const priceTot = vehicle.total_gross_price.toString();
		priceTotal.innerHTML = `<div>Cena brutto: </div> <div>${priceTot.slice(
			-6,
			-3
		)} ${priceTot.slice(-3)}  <span> zł</span></div>`;

		const button = document.createElement("button");
		button.innerText = "ZOBACZ OFERTĘ";

		card.appendChild(title);
		card.appendChild(subTitle);
		card.appendChild(availability);
		card.appendChild(img);
		card.appendChild(productionYear);
		card.appendChild(gear);
		card.appendChild(city);
		card.appendChild(price);
		card.appendChild(priceTotal);
		card.appendChild(button);

		vehicleList.appendChild(card);
	});
};

document.addEventListener("DOMContentLoaded", async () => {
	const data = await fetchData();

	renderVehicleList(data);

	//cities array
	const cities = [...new Set(data.map((vehicle) => vehicle.miasto))];

	//cities filter

	const cityFilter = document.getElementById("cityFilter");
	cities.forEach((city) => {
		const option = document.createElement("option");
		option.value = city;
		option.textContent = city;
		cityFilter.appendChild(option);
	});
	const filterCityOffers = () => {
		const selectedCity = cityFilter.value;
		const filteredOffers = data.filter(
			(vehicle) => selectedCity === vehicle.miasto
		);
		if (!!selectedCity) {
			renderVehicleList(filteredOffers);
		} else {
			renderVehicleList(data);
		}
	};
	cityFilter.addEventListener("change", filterCityOffers);
	filterCityOffers();

	//cheapest and most expensive sorting
	const sortPrice = document.getElementById("sortPrice");
	let selectedFilter = sortPrice.value;

	const sortPriceOffers = () => {
		selectedFilter = sortPrice.value;
		const sortedCheapestOffers = data
			.slice()
			.sort((a, b) => a.total_gross_price - b.total_gross_price);
		const sortedExpOffers = data
			.slice()
			.sort((a, b) => b.total_gross_price - a.total_gross_price);
		if (selectedFilter === "CENY ROSNĄCO") {
			renderVehicleList(sortedCheapestOffers);
		} else {
			renderVehicleList(sortedExpOffers);
		}
	};

	sortPrice.addEventListener("change", sortPriceOffers);
	sortPriceOffers();
});
