const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double-money');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add random money
async function getRandomUser() {
    const resp = await fetch('https://randomuser.me/api');
    const data = await resp.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    }

    addData(newUser);
}

// Add new user to data array
function addData(user) {
    data.push(user);

    updateDom();
}

// Double person's money
function doubleMoney() {
    data = data.map(person => ({
        ...person, money: person.money * 2,
    }))

    updateDom();
}

// Update DOM
function updateDom(providedData = data) {
    // Clear main
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(person => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong> $${formatMoney(person.money)}`;
        main.appendChild(element);
    })

}// Format number as money, see: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);

