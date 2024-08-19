let stories = JSON.parse(localStorage.getItem('stories')) || [];

// Function to save stories to localStorage
function saveStories() {
    localStorage.setItem('stories', JSON.stringify(stories));
}

// Function to render the list of stories on the main page
function renderStoryList() {
    const storyListElement = document.getElementById('story-list');
    storyListElement.innerHTML = '';

    stories.forEach((story, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${story.nameEn} (${story.nameUr})</span>
            <div class="nlist-item">
                <a class="view-button" onclick="viewStory(${index})">View</a>
                <img src="images/edit.png"  class="icon-button-s" onclick="editStory(${index})">
                <img src="images/delete.png" class="icon-button-s" onclick="deleteStory(${index})">
                 <span class="cate-span"> ${story.category}</span>
            </div>
        `;
        storyListElement.appendChild(listItem);
    });
}

// Function to handle adding a new story
document.getElementById('story-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const nameEn = document.getElementById('name-en').value;
    const nameUr = document.getElementById('name-ur').value;
    const category = document.getElementById('category').value;
    const storyContent = document.getElementById('story-content').value;

    const newStory = { id: Date.now(), nameEn, nameUr, category, content: storyContent };
    stories.push(newStory);
    saveStories();
    window.location.href = 'stories.html'; // Redirect back to the main page
});

// Function to handle editing an existing story
function editStory(index) {
    localStorage.setItem('editStoryIndex', index);
    window.location.href = 'edit.html';
}

if (window.location.pathname.includes('edit.html')) {
    const index = localStorage.getItem('editStoryIndex');
    const story = stories[index];
    document.getElementById('name-en').value = story.nameEn;
    document.getElementById('name-ur').value = story.nameUr;
    document.getElementById('category').value = story.category;
    document.getElementById('story-content').value = story.content;

    document.getElementById('story-form').addEventListener('submit', function (e) {
        e.preventDefault();
        story.nameEn = document.getElementById('name-en').value;
        story.nameUr = document.getElementById('name-ur').value;
        story.category = document.getElementById('category').value;
        story.content = document.getElementById('story-content').value;

        saveStories();
        window.location.href = 'stories.html'; // Redirect back to the main page
    });
}

// Function to handle viewing a story's details
function viewStory(index) {
    localStorage.setItem('viewStoryIndex', index);
    window.location.href = 'view.html';

}

if (window.location.pathname.includes('view.html')) {
    const index = localStorage.getItem('viewStoryIndex');
    const story = stories[index];
    document.getElementById('story-name-en').innerText = story.nameEn;
    document.getElementById('story-name-ur').innerText = story.nameUr;
    document.getElementById('story-category').innerText = story.category;
    document.getElementById('story-content').innerText = story.content;
}

// Function to handle deleting a story
function deleteStory(index) {
    if (confirm('Are you sure you want to delete this story?')) {
        stories.splice(index, 1);
        saveStories();
        renderStoryList();
    }
}

// Initial rendering of the story list
renderStoryList();
