const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
let userInputName = document.getElementsByName('userInputName')[0];
let userInputPhone = document.getElementsByName('userInputPhone')[0];
let changeButton;
let contactCount = 0;
function createContact(contact) {
    let contactItem = document.createElement('li');
    const contactID = `contact-${contactCount++}`;
    contactItem.innerHTML = `
        <input type="text" id="${contactID}-name" value="${contact.name}" autocomplete="name" disabled>
        <input type="text" id="${contactID}-name" value="${contact.phone}" autocomplete="tel" disabled>
        <button class="btn-change">Ändra</button>
        <button class="btn-delete">Radera</button>`;
    return contactItem;
}

function saveContact(contactItem) {
    userInputName.disabled = true;
    userInputPhone.disabled = true;
    changeButton.textContent = 'Ändra';
}

function handleClick(event) {
    const contactItem = event.target.parentElement;

    if (event.target.classList.contains('btn-change')) {
        if (changeButton.textContent === 'Ändra') {
            userInputName.disabled = false;
            userInputPhone.disabled = false;
            changeButton.textContent = 'Spara';
        } else if (changeButton.textContent === 'Spara') {
            saveContact(contactItem);
        }
    } else if (event.target.classList.contains('btn-delete'))
    {
        contactItem.remove();
    }
}

let errorMessage = document.getElementById('error-message');
function validate(name, phone) {
    errorMessage.textContent = '';
    if (!name || !phone) {
        errorMessage.textContent = 'Får ej skapa tom kontakt';
        errorMessage.style.color = 'red';
    } else {
        const contact = { name, phone };
        const contactItem = createContact(contact);
        contactList.appendChild(contactItem);
        userInputName.value = '';
        userInputPhone.value = '';
    }
}

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    userInputName = userInputName;
    userInputPhone = userInputPhone;
    validate(userInputName.value, userInputPhone.value);
});

contactList.addEventListener('click', function (event) {
    userInputName = event.target.parentElement.querySelector('input[id$="-name"]');
    userInputPhone = event.target.parentElement.querySelector('input[id$="-phone"]');
    changeButton = event.target;
    handleClick(event);
});
