const API_URL = "https://698595546964f10bf253b560.mockapi.io/students";

const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

// Load danh sách sinh viên
async function loadStudents() {
    const res = await fetch(API_URL);
    const data = await res.json();

    table.innerHTML = "";
    data.forEach(sv => {
        table.innerHTML += `
            <tr>
                <td>${sv.id}</td>
                <td>
                    <img src="${sv.avatar || 'https://via.placeholder.com/50'}">
                </td>
                <td>${sv.name}</td>
                <td>${sv.phone}</td>
                <td>${sv.email}</td>
                <td>
                    <button onclick="editStudent(${sv.id})">Sửa</button>
                    <button onclick="deleteStudent(${sv.id})">Xóa</button>
                </td>
            </tr>
        `;
    });
}

// Thêm / Cập nhật sinh viên
form.onsubmit = async (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const student = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        avatar: document.getElementById("avatar").value
    };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });
    }

    form.reset();
    loadStudents();
};

// Sửa sinh viên
async function editStudent(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const sv = await res.json();

    document.getElementById("id").value = sv.id;
    document.getElementById("name").value = sv.name;
    document.getElementById("phone").value = sv.phone;
    document.getElementById("email").value = sv.email;
    document.getElementById("avatar").value = sv.avatar;
}

// Xóa sinh viên
async function deleteStudent(id) {
    if (confirm("Bạn có chắc muốn xóa?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        loadStudents();
    }
}

// Khởi động
loadStudents();
