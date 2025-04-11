document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

async function loadUsers() {
    const response = await fetch('/api/users');
    const users = await response.json();

    const tbody = document.querySelector('#usersTableBody');
    tbody.innerHTML = '';

    users.forEach(user => {
        const row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="openEditModal(${user.id})">Edit</button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="openDeleteModal(${user.id})">Delete</button>
                </td>
            </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

async function submitCreateUser(event) {
    event.preventDefault();

    const name = document.getElementById('create-name').value;
    const lastName = document.getElementById('create-lastName').value;
    const age = document.getElementById('create-age').value;

    const user = {
        name: name,
        lastName: lastName,
        age: parseInt(age),
    };

    const response = await fetch('/api/users/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin',
        body: JSON.stringify(user)
    });

    if (response.ok) {
        bootstrap.Modal.getInstance(document.getElementById('createUserModal')).hide();
        loadUsers();
    } else {
        const text = await response.text();
        alert("Error when creating New User: " + text);
    }
}

async function submitEditUser(event) {
    event.preventDefault();

    const user = {
        id: parseInt(document.getElementById('edit-id').value),
        name: document.getElementById('edit-name').value,
        lastName: document.getElementById('edit-lastName').value,
        age: document.getElementById('edit-age').value
    }

    const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin',
        body: JSON.stringify(user)
    });

    if (response.ok) {
        bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
        loadUsers();
    } else {
        alert('Error when editing User');
    }
}

async function submitDeleteUser(event) {
    event.preventDefault();
    const id = document.getElementById('delete-id-hidden').value;

    const response = await fetch(`/api/users/delete?userId=${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        bootstrap.Modal.getInstance(document.getElementById('deleteUserModal')).hide();
        loadUsers();
    } else {
        alert('Error when deleting User');
    }
}

async function openEditModal(id) {
    const res = await fetch(`/api/users/get?userId=${id}`);
    const user = await res.json();

    document.getElementById('edit-id').value = user.id;
    document.getElementById('edit-id-hidden').value = user.id;
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-lastName').value = user.lastName;
    document.getElementById('edit-age').value = user.age;

    const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
}

async function openDeleteModal(id) {
    const res = await fetch(`/api/users/get?userId=${id}`);
    const user = await res.json();

    document.getElementById('delete-id').value = user.id;
    document.getElementById('delete-id-hidden').value = user.id;
    document.getElementById('delete-name').value = user.name;
    document.getElementById('delete-lastName').value = user.lastName;
    document.getElementById('delete-age').value = user.age;

    const modal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
    modal.show();
}