const input = document.querySelector('input');
const ul = document.querySelector('ul');
const addBtn = document.querySelector('.add-btn');
const invalidCheck = document.querySelector('.invalid-check');
const logoutBtn = document.querySelector('#logout-btn')

logoutBtn.addEventListener('click', async e => {
	await axios.get('/api/logout');
	window.location.pathname ='/';
})

const getTodos = async () => {
	const { data } = await axios.get('/api/todos', {
		withCredentials: true
	});
	data.forEach(element => {
		// Create the HTML Elements and asign the value of the input

	const div = document.createElement('div');
	const listItem = document.createElement('li');
	listItem.id = element.id;
	const todo = document.createElement('p');
	const deleteIcon = document.createElement('i');
	const checkIcon = document.createElement('i');
	const deleteIconSvg = createDeleteIconSvg();
	const checkIconSvg = createCheckIconSvg();
	const newTodo = element.text;
	
	
	// Add the classes to the HTML Elements
	div.classList.add('group', 'grow', 'flex', 'flex-row', 'justify-between');
	listItem.classList.add('flex', 'flex-row');
	todo.classList.add('p-4', 'break-words', 'grow');
	deleteIcon.classList.add('delete-icon', 'w-12', 'md:w-14', 'hidden', 'group-hover:flex', 'group-hover:justify-center', 'group-hover:items-center', 'cursor-pointer', 'bg-red-500', 'origin-left');
	checkIcon.classList.add('check-icon', 'w-12', 'md:w-14', 'flex', 'justify-center', 'items-center', 'cursor-pointer', 'border-l', 'border-slate-300', 'dark:border-slate-400', 'hover:bg-green-300', 'transition', 'duration-300', 'easy-in-out');

	// Add classes if element is checked
	if (element.checked) {
		checkIcon.classList.add('bg-green-400');
		checkIcon.classList.remove('hover:bg-green-300');
		listItem.classList.add('line-through', 'text-slate-400', 'dark:text-slate-600');
	}

	// Append the elemets
	deleteIcon.appendChild(deleteIconSvg);
	checkIcon.appendChild(checkIconSvg);
	todo.append(newTodo);
	div.appendChild(deleteIcon);
	div.appendChild(todo);
	listItem.append(div, checkIcon);
	ul.appendChild(listItem);
	} )
}

getTodos();

const createDeleteIconSvg = () => {
	const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	const pathSvg = document.createElementNS('http://www.w3.org/2000/svg', 'path');

	iconSvg.setAttribute('fill', 'none');
	iconSvg.setAttribute('viewBox', '0 0 24 24');
	iconSvg.setAttribute('stroke', 'currentColor');
	iconSvg.setAttribute('stroke-width', '2');

	iconSvg.classList.add('h-6', 'w-6', 'md:h-7', 'md:w-7', 'text-white');
	
	pathSvg.setAttribute('d', 'M6 18L18 6M6 6l12 12');
	pathSvg.setAttribute('stroke-linecap', 'round');
	pathSvg.setAttribute('stroke-linejoin', 'round');

	iconSvg.appendChild(pathSvg);
	return iconSvg;
};

const createCheckIconSvg = () => {
	const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	const pathSvg = document.createElementNS('http://www.w3.org/2000/svg', 'path');

	iconSvg.setAttribute('fill', 'none');
	iconSvg.setAttribute('viewBox', '0 0 24 24');
	iconSvg.setAttribute('stroke', 'currentColor');
	iconSvg.setAttribute('stroke-width', '2');

	iconSvg.classList.add('h-6', 'w-6', 'md:h-7', 'md:w-7', 'text-green-600');
	
	pathSvg.setAttribute('d', 'M5 13l4 4L19 7');
	pathSvg.setAttribute('stroke-linecap', 'round');
	pathSvg.setAttribute('stroke-linejoin', 'round');

	iconSvg.appendChild(pathSvg);
	return iconSvg;
};

const addTodo = async () => {
	// Create todo in API
	const { data } = await axios.post('/api/todos', {text: input.value}, {
		withCredentials: true
	})
	
	// Create the HTML Elements and asign the value of the input

	const div = document.createElement('div');
	const listItem = document.createElement('li');
	listItem.id = data.id;
	const todo = document.createElement('p');
	const deleteIcon = document.createElement('i');
	const checkIcon = document.createElement('i');
	const deleteIconSvg = createDeleteIconSvg();
	const checkIconSvg = createCheckIconSvg();
	const newTodo = input.value;
	input.value = '';
	
	// Add the classes to the HTML Elements
	div.classList.add('group', 'grow', 'flex', 'flex-row', 'justify-between');
	listItem.classList.add('flex', 'flex-row');
	todo.classList.add('p-4', 'break-words', 'grow');
	deleteIcon.classList.add('delete-icon', 'w-12', 'md:w-14', 'hidden', 'group-hover:flex', 'group-hover:justify-center', 'group-hover:items-center', 'cursor-pointer', 'bg-red-500', 'origin-left');
	checkIcon.classList.add('check-icon', 'w-12', 'md:w-14', 'flex', 'justify-center', 'items-center', 'cursor-pointer', 'border-l', 'border-slate-300', 'dark:border-slate-400', 'hover:bg-green-300', 'transition', 'duration-300', 'easy-in-out');

	// Append the elemets
	deleteIcon.appendChild(deleteIconSvg);
	checkIcon.appendChild(checkIconSvg);
	todo.append(newTodo);
	div.appendChild(deleteIcon);
	div.appendChild(todo);
	listItem.append(div, checkIcon);
	ul.appendChild(listItem);
};

const totalCount = () => {
	const count = document.querySelector('.total-count');
	const totalTodos = document.querySelector('.total-todos');
	const howMany = document.querySelectorAll('ul li').length; 
	count.textContent = '';
	count.append(howMany);
	totalTodos.appendChild(count);
};

const completeCount = () => {
	const count = document.querySelector('.completed-count');
	const completedTodos = document.querySelector('.completed-todos');
	const howMany = document.querySelectorAll('.line-through').length;
	count.textContent = '';
	count.append(howMany);
	completedTodos.appendChild(count);
};

const incompletedCount = () => {
	const count = document.querySelector('.incompleted-count');
	const incompletedTodos = document.querySelector('.incompleted-todos');
	const howMany = document.querySelectorAll('ul li:not(.line-through)').length; 
	count.textContent = '';
	count.append(howMany);
	incompletedTodos.appendChild(count);
};

const todoCount = () => {
	totalCount();
	completeCount();
	incompletedCount();
};

// Add a todo by keyboard
input.addEventListener('keydown', event => {
	if (event.key === 'Enter' && input.value !== '') {
		input.classList.remove('border-2', 'border-rose-500');
		invalidCheck.classList.add('hidden');
		addTodo();
		todoCount();
		
	} else if (event.key === 'Enter' && input.value === '') {
		input.classList.remove('focus:ring-2', 'focus:ring-violet-600');
		input.classList.add('focus:ring-2', 'focus:ring-rose-600');
		invalidCheck.classList.remove('hidden');
	} else {
		input.classList.remove('focus:ring-2', 'focus:ring-rose-600', 'border-2', 'border-rose-600');
		input.classList.add('focus:ring-2', 'focus:ring-violet-600');
		invalidCheck.classList.add('hidden');
	};
});

// Add a todo by button
addBtn.addEventListener('click', () => {
	if (input.value !== '') {
		addTodo();
		todoCount();
		
	} else {
		input.classList.remove('focus:ring-2', 'focus:ring-violet-600');
		input.classList.add('border-2', 'border-rose-600');
		invalidCheck.classList.remove('hidden');
	}
});

ul.addEventListener('click', async event => {
	
	if (event.target.closest('.delete-icon')) {
		const li = event.target.closest('.delete-icon').parentElement.parentElement;
		const id = li.id;
		await axios.delete(`/api/todos/${id}`)
		li.remove();
	}

	if (event.target.closest('.check-icon')) {
		const li = event.target.closest('.check-icon').parentElement;
		const id = li.id;
		const checkIcon = event.target.closest('.check-icon');
		if (!li.classList.contains('line-through')) {
			await axios.patch(`/api/todos/${id}`, {checked: true})
			checkIcon.classList.add('bg-green-400');
			checkIcon.classList.remove('hover:bg-green-300');
			li.classList.add('line-through', 'text-slate-400', 'dark:text-slate-600');	
		} else {
			await axios.patch(`/api/todos/${id}`, {checked: false})
			checkIcon.classList.remove('bg-green-400');
			checkIcon.classList.add('hover:bg-green-300');
			li.classList.remove('line-through', 'text-slate-400', 'dark:text-slate-600');
		}
		todoCount();
	}

});

(() => {
	
})();