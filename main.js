let categories = [];
let editIndex = null;
let deleteIndex = null; 

function renderCategories() {
    const listElement = document.getElementById('category-list');
    listElement.innerHTML = '';
    categories.forEach((category, index) => {
        listElement.innerHTML += `
            <li class="category-item">
                <span>${category}</span>
                <div>
                    <!-- Image button for edit -->
                    <img src="images/edit.png"  class="icon-button" onclick="showEditPopup(${index})">
                    <!-- Image button for delete -->
                    <img src="images/delete.png" class="icon-button" onclick="showDeleteConfirmation(${index})">
                </div>
            </li>
        `;
    });
}

function showAddPopup() {
    document.getElementById('popup-title').innerText = 'Add Category';
    document.getElementById('category-input').value = '';
    editIndex = null;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

function showEditPopup(index) {
    document.getElementById('popup-title').innerText = 'Edit Category';
    document.getElementById('category-input').value = categories[index];
    editIndex = index;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
}

function saveCategory() {
    const categoryInput = document.getElementById('category-input').value;
    if (categoryInput.trim() === '') return;

    if (editIndex !== null) {
        categories[editIndex] = categoryInput;
    } else {
        categories.push(categoryInput);
    }

    closePopup();
    renderCategories();
}


function showDeleteConfirmation(index) {
    deleteIndex = index;
    document.getElementById('delete-confirmation-overlay').style.display = 'block';
    document.getElementById('delete-confirmation-popup').style.display = 'block';
}

function closeDeleteConfirmation() {
    document.getElementById('delete-confirmation-overlay').style.display = 'none';
    document.getElementById('delete-confirmation-popup').style.display = 'none';
    deleteIndex = null; // Reset the delete index
}

document.getElementById('confirm-delete-btn').onclick = function () {
    if (deleteIndex !== null) {
        categories.splice(deleteIndex, 1);
        renderCategories();
        closeDeleteConfirmation();
    }
};

function closePopup() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

// Close popup when clicking outside of it
document.getElementById('overlay').onclick = closePopup;



// Stories js
