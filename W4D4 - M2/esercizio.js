const movies = [{
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    price: 8.50,
    availableSeats: 45
}, {
    id: 2,
    title: "Inception",
    genre: "Sci-Fi",
    price: 9.00,
    availableSeats: 30
}, {
    id: 3,
    title: "Titanic",
    genre: "Romance",
    price: 7.50,
    availableSeats: 60
}, {
    id: 4,
    title: "The Dark Knight",
    genre: "Action",
    price: 9.50,
    availableSeats: 25
}, {
    id: 5,
    title: "Avatar",
    genre: "Fantasy",
    price: 10.00,
    availableSeats: 50
}, {
    id: 6,
    title: "Gladiator",
    genre: "Action",
    price: 8.00,
    availableSeats: 35
}, {
    id: 7,
    title: "The Matrix",
    genre: "Sci-Fi",
    price: 7.00,
    availableSeats: 20
}, {
    id: 8,
    title: "Joker",
    genre: "Drama",
    price: 8.50,
    availableSeats: 15
}, {
    id: 9,
    title: "Oppenheimer",
    genre: "Drama",
    price: 10.50,
    availableSeats: 40
}, {
    id: 10,
    title: "Dune",
    genre: "Sci-Fi",
    price: 9.00,
    availableSeats: 5
}, {
    id: 11,
    title: "The Prestige",
    genre: "Thriller",
    price: 8.00,
    availableSeats: 18
}, {
    id: 12,
    title: "Whiplash",
    genre: "Drama",
    price: 7.50,
    availableSeats: 22
}, {
    id: 13,
    title: "Parasite",
    genre: "Thriller",
    price: 8.50,
    availableSeats: 28
}, {
    id: 14,
    title: "The Lion King",
    genre: "Animation",
    price: 7.00,
    availableSeats: 55
}, {
    id: 15,
    title: "Toy Story",
    genre: "Animation",
    price: 6.50,
    availableSeats: 40
}];

const movieSelect = document.getElementById("movie-select");
const ticketsInput = document.getElementById("tickets-input");
const bookBtn = document.getElementById("book-btn");
const result = document.getElementById("result");
const totalBox = document.getElementById("total-box");
const totalBookedEl = document.getElementById("total-booked");
const tableBody = document.getElementById("movies-table-body");

let totalBooked = 0;

function fillSelect() {
    for (let movie of movies) {
        movieSelect.innerHTML += `<option value="${movie.id}">${movie.title}</option>`;
    }
}

function showTable() {
    tableBody.innerHTML = "";

    for (let movie of movies) {
        let seats = movie.availableSeats;

        if (seats === 0) {
            seats = "SOLD OUT";
        }

        tableBody.innerHTML += `<tr>
            <td>${movie.title}</td>
            <td>${movie.genre}</td>
            <td>€ ${movie.price.toFixed(2)}</td>
            <td>${seats}</td>
        </tr>`;
    }
}

function bookTickets(movieId, quantity) {
    let movie = movies.find(m => m.id === movieId);

    if (quantity < 1 || isNaN(quantity)) {
        return "Inserisci almeno 1 biglietto.";
    }

    if (quantity > movie.availableSeats) {
        return "Non ci sono abbastanza posti disponibili.";
    }

    movie.availableSeats = movie.availableSeats - quantity;
    totalBooked = totalBooked + quantity;

    let total = movie.price * quantity;

    if (quantity >= 5) {
        total = total * 0.8;
        totalBox.textContent = "Il totale da pagare è € " + total.toFixed(2);
    } else {
        totalBox.textContent = "";
    }

    return "Prenotazione confermata per " + movie.title + ".";
}

bookBtn.addEventListener("click", function() {
    let movieId = Number(movieSelect.value);
    let quantity = parseInt(ticketsInput.value);

    result.textContent = bookTickets(movieId, quantity);
    showTable();
    totalBookedEl.textContent = totalBooked;
});

fillSelect();
showTable();
