async function fetchData() {
	try {
		const response = await fetch(
			"https://gx.pandora.caps.pl/zadania/api/offers2023.json"
		);
		const data = await response.json();
		console.log(data.offers);
		return data.offers;
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

function getMonth(pdd) {
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
}

function renderVehicleList(vehicles) {
	const vehicleList = document.getElementById("vehicleList");
	vehicleList.innerHTML = "";

	vehicles.forEach((vehicle) => {
		const card = document.createElement("div");
		card.classList.add("vehicle-card");

		const img = document.createElement("img");
		img.src = vehicle.offer_details.image_paths.front;

		const title = document.createElement("h2");
		title.textContent = vehicle.offer_details.model_details;

		const subTitle = document.createElement("h3");
		subTitle.textContent = vehicle.offer_details.kabina;

		const availability = document.createElement("h3");
		availability.textContent = !!vehicle.in_stock
			? "Dostępny od ręki!"
			: "Przewidywana data dostawy " +
			  getMonth(vehicle.pdd) +
			  vehicle.pdd.slice(0, 4);

		const productionYear = document.createElement("p");
		productionYear.textContent = "Rok produkcji: " + vehicle.pyear;

		const gear = document.createElement("p");
		gear.textContent =
			"Skrzynia: " +
			(vehicle.offer_details.skrzynia_automatyczna
				? "Automatyczna"
				: "Manualna");

		const price = document.createElement("p");
		price.textContent = "Cena netto: " + vehicle.car_price_disc + " zł";

		const priceTotal = document.createElement("p");
		priceTotal.textContent =
			"Cena brutto: " + vehicle.total_gross_price + " zł";

		const city = document.createElement("p");
		city.textContent = "Miasto: " + vehicle.miasto;
		card.appendChild(title);
		card.appendChild(subTitle);
		card.appendChild(availability);
		card.appendChild(img);
		card.appendChild(productionYear);
		card.appendChild(gear);
		card.appendChild(city);
		card.appendChild(price);
		card.appendChild(priceTotal);

		vehicleList.appendChild(card);
	});
}

document.addEventListener("DOMContentLoaded", async () => {
	const data = await fetchData();
	renderVehicleList(data);
});
