const addBtn = document.getElementById('add');
const clearBtn = document.getElementById('clear');

const notesLS = JSON.parse(localStorage.getItem('notes'));

notesLS ? notesLS.forEach(note => createNote(note)) : '';

addBtn.addEventListener('click', () => createNote(''));
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

function createNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');
  note.innerHTML = `
      <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
      </div>

      <div class="main ${text ? '' : 'hidden'}"></div>
      <textarea class="${text ? 'hidden' : ''}" ></textarea>
  `;

  const deleteBtn = note.querySelector('.delete');
  const editBtn = note.querySelector('.edit');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text;
  main.innerHTML = marked(text);

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', e => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const textAreas = document.querySelectorAll('textarea');

  const notes = [];

  textAreas.forEach(note => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes));
}
