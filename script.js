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

		const price = document.createElement("p");
		price.textContent = "Cena: " + vehicle.car_price_disc + " zł netto";

		const city = document.createElement("p");
		city.textContent = "Miasto: " + vehicle.miasto;

		card.appendChild(img);
		card.appendChild(title);
		card.appendChild(subTitle);
		card.appendChild(price);
		card.appendChild(city);

		vehicleList.appendChild(card);
	});
}

document.addEventListener("DOMContentLoaded", async () => {
	const data = await fetchData();
    renderVehicleList(data);
});
