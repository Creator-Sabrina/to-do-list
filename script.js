function addTask() {
    const input = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    if (input.value.trim() === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }
    
    const li = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = input.value;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
        saveTasksToLocalStorage();
    };
    
    taskText.onclick = function() {
        taskText.classList.toggle('completed');
        saveTasksToLocalStorage();
    };
    
    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    
    input.value = '';
    saveTasksToLocalStorage();
}

// Função para salvar tarefas no localStorage
function saveTasksToLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
    
    for (const task of taskList.children) {
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.querySelector('span').classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar tarefas do localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add('completed');
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasksToLocalStorage();
        };
        
        taskText.onclick = function() {
            taskText.classList.toggle('completed');
            saveTasksToLocalStorage();
        };
        
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Carregar tarefas quando a página for carregada
document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
    
    // Adicionar evento para o botão de limpar todas as tarefas
    document.getElementById('clearAll').addEventListener('click', function() {
        if (confirm('Tem certeza que deseja excluir todas as tarefas?')) {
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = '';
            localStorage.removeItem('tasks');
        }
    });
}); 