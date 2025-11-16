const writeBtn = document.getElementById('writeBtn');
const writeBox = document.querySelector('.writeBox');
const submitBtn = writeBox.querySelector('input[type="submit"]');

writeBtn.addEventListener('click', () => {
  writeBox.style.display = 'flex';
});

submitBtn.addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  fetch('http://localhost:3000/write', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('글 저장 완료! id: ' + data.id);
      writeBox.style.display = 'none';
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
    } else {
      alert('저장 실패');
    }
  })
  .catch(err => console.error(err));
});
