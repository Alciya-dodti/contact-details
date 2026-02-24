let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = -1;

function saveData() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function displayContacts(filteredContacts = contacts) {
    const list = document.getElementById("contactList");
    const count = document.getElementById("count");
    list.innerHTML = "";

    filteredContacts.forEach((contact, index) => {
        list.innerHTML += `
            <div class="contact">
                <strong>${contact.name}</strong><br>
                ${contact.email}<br>
                ${contact.phone}
                <div class="buttons">
                    <button class="edit-btn" onclick="editContact(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>
                </div>
            </div>
        `;
    });

    count.innerText = contacts.length;
}

function addOrUpdateContact() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const btn = document.getElementById("submitBtn");

    if (name === "" || email === "" || phone === "") {
        alert("All fields are required!");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return;
    }

    if (editIndex === -1) {
        contacts.push({ name, email, phone });
    } else {
        contacts[editIndex] = { name, email, phone };
        editIndex = -1;
        btn.innerText = "Add Contact";
    }

    saveData();
    displayContacts();
    clearFields();
}

function editContact(index) {
    document.getElementById("name").value = contacts[index].name;
    document.getElementById("email").value = contacts[index].email;
    document.getElementById("phone").value = contacts[index].phone;
    document.getElementById("submitBtn").innerText = "Update Contact";
    editIndex = index;
}

function deleteContact(index) {
    contacts.splice(index, 1);
    saveData();
    displayContacts();
}

function searchContact() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchValue) ||
        contact.email.toLowerCase().includes(searchValue)
    );
    displayContacts(filtered);
}

function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

displayContacts();
