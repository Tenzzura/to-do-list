document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput'); // Input untuk menambahkan tugas baru
    const addTaskBtn = document.getElementById('addTaskBtn'); // Tombol untuk menambahkan tugas
    const taskList = document.getElementById('taskList'); // Daftar tugas
    let tasks = []; // Array untuk menyimpan tugas-tugas

    // Memuat tugas-tugas dari localStorage jika ada
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks')); // Mengambil dan mengonversi data tugas dari localStorage
        renderTasks(); // Menampilkan tugas-tugas yang telah dimuat
    }

    // Fungsi untuk menambahkan tugas
    function addTask() {
        const task = taskInput.value.trim(); // Mengambil nilai dari input dan menghapus spasi di awal dan akhir
        if (task) { // Memastikan input tidak kosong
            tasks.push({ text: task, completed: false }); // Menambahkan tugas baru ke array tugas
            taskInput.value = ''; // Mengosongkan input setelah menambahkan tugas
            saveTasks(); // Menyimpan tugas ke localStorage
            renderTasks(); // Menampilkan tugas yang telah diperbarui
        } else {
            alert('Tugas tidak boleh kosong.'); // Menampilkan alert jika input kosong
        }
    }

    // Menambahkan tugas saat tombol "Add Task" diklik
    addTaskBtn.addEventListener('click', addTask);

    // Menambahkan tugas saat tombol "Enter" ditekan di input
    taskInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { // Memeriksa apakah tombol yang ditekan adalah "Enter"
            addTask(); // Menambahkan tugas jika "Enter" ditekan
        }
    });

    // Menangani aksi klik pada daftar tugas
    taskList.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') { // Memeriksa apakah yang diklik adalah tombol "Delete"
            const index = e.target.parentElement.getAttribute('data-index'); // Mendapatkan indeks tugas dari atribut data-index
            tasks.splice(index, 1); // Menghapus tugas dari array berdasarkan indeks
            saveTasks(); // Menyimpan perubahan ke localStorage
            renderTasks(); // Menampilkan tugas yang telah diperbarui
        } else if (e.target.tagName === 'LI') { // Memeriksa apakah yang diklik adalah elemen daftar tugas (LI)
            const index = e.target.getAttribute('data-index'); // Mendapatkan indeks tugas dari atribut data-index
            tasks[index].completed = !tasks[index].completed; // Mengubah status completed tugas
            saveTasks(); // Menyimpan perubahan ke localStorage
            renderTasks(); // Menampilkan tugas yang telah diperbarui
        }
    });

    // Fungsi untuk menampilkan tugas
    function renderTasks() {
        taskList.innerHTML = ''; // Menghapus konten daftar tugas sebelumnya
        tasks.forEach((task, i) => {
            const li = document.createElement('li'); // Membuat elemen daftar tugas (LI)
            li.setAttribute('data-index', i); // Menetapkan atribut data-index untuk tugas
            
            // Membuat elemen span untuk teks tugas
            const taskText = document.createElement('span');
            taskText.textContent = task.text; // Menetapkan teks tugas
            taskText.classList.add('task-text'); // Menambahkan kelas untuk styling
            li.appendChild(taskText); // Menambahkan teks tugas ke elemen LI

            // Menambahkan kelas 'completed' jika tugas sudah selesai
            if (task.completed) {
                li.classList.add('completed');
            }

            // Membuat tombol delete
            const btn = document.createElement('button');
            btn.textContent = 'Delete'; // Menetapkan teks tombol
            li.appendChild(btn); // Menambahkan tombol ke elemen LI

            taskList.appendChild(li); // Menambahkan elemen LI ke daftar tugas
        });
    }

    // Fungsi untuk menyimpan tugas ke localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Mengonversi array tugas ke string JSON dan menyimpannya ke localStorage
    }
});
