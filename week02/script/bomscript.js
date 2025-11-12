const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', () => {
    if (input.value.trim() === '') {
        alert('Please enter a Book and Chapter!');
        return;
    }

    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.textContent = input.value;
    deleteButton.textContent = '❌'
    deleteButton.setAttribute('aria-label', 'Remove chapter');

    li.append(deleteButton);
    list.append(li);

    if (list.children.length >= 10) {
        alert('You can only add 10 chapters to your Top 10 list!');
        return;
    }

    input.value = '';
    input.focus();

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') button.click();
    });

    deleteButton.addEventListener('click', () => {
        list.removeChild(li);
    });
});