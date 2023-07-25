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
		card.classList.add("vehicleCard");

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
		price.innerHTML = `<div>Cena netto: </div> <div class="price">${vehicle.car_price_disc}  zł</div>`;

		const priceTotal = document.createElement("div");
		priceTotal.innerHTML = `<div>Cena brutto: </div> <div>${vehicle.total_gross_price}  zł</div>`;

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
}

document.addEventListener("DOMContentLoaded", async () => {
	const data = await fetchData();
	renderVehicleList(data);
});
