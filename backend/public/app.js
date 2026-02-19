// app.js - Lógica JavaScript pura para o frontend

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const loginSection = document.getElementById('login-section');
    const dashboard = document.getElementById('dashboard');
    const messageDiv = document.getElementById('message');
    const showVehiclesBtn = document.getElementById('show-vehicles');
    const vehiclesSection = document.getElementById('vehicles-section');
    const vehiclesList = document.getElementById('vehicles-list');
    const addVehicleBtn = document.getElementById('add-vehicle-btn');
    const vehicleForm = document.getElementById('vehicle-form');
    const vehicleFormElement = document.getElementById('vehicle-form-element');
    const cancelBtn = document.getElementById('cancel-btn');
    const formTitle = document.getElementById('form-title');

    let editingVehicleId = null;

    // Verificar se usuário está logado
    const token = localStorage.getItem('token');
    if (token) {
        showDashboard();
    }

    // Função para mostrar mensagem
    function showMessage(message, type = 'info') {
        messageDiv.textContent = message;
        messageDiv.style.color = type === 'error' ? 'red' : 'green';
        setTimeout(() => {
            messageDiv.textContent = '';
        }, 5000);
    }

    // Função para fazer requisições autenticadas
    async function apiRequest(url, options = {}) {
        const token = localStorage.getItem('token');
        return fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers
            }
        });
    }

    // Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                showDashboard();
                showMessage('Login realizado com sucesso!', 'success');
            } else {
                showMessage(data.message || 'Erro no login', 'error');
            }
        } catch (error) {
            showMessage('Erro de conexão', 'error');
        }
    });

    // Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        showLogin();
        showMessage('Logout realizado');
    });

    // Mostrar seção de veículos
    showVehiclesBtn.addEventListener('click', () => {
        vehiclesSection.style.display = 'block';
        vehicleForm.style.display = 'none';
        loadVehicles();
    });

    // Adicionar veículo
    addVehicleBtn.addEventListener('click', () => {
        editingVehicleId = null;
        formTitle.textContent = 'Adicionar Veículo';
        vehicleFormElement.reset();
        vehicleForm.style.display = 'block';
        vehiclesSection.style.display = 'none';
    });

    // Cancelar edição
    cancelBtn.addEventListener('click', () => {
        vehicleForm.style.display = 'none';
        vehiclesSection.style.display = 'block';
    });

    // Salvar veículo
    vehicleFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const vehicleData = {
            placa: document.getElementById('placa').value,
            modelo: document.getElementById('modelo').value,
            motor: document.getElementById('motor').value,
            observacoes: document.getElementById('observacoes').value
        };

        try {
            const method = editingVehicleId ? 'PUT' : 'POST';
            const url = editingVehicleId ? `/api/vehicles/${editingVehicleId}` : '/api/vehicles';
            
            const response = await apiRequest(url, {
                method,
                body: JSON.stringify(vehicleData)
            });

            if (response.ok) {
                showMessage(editingVehicleId ? 'Veículo atualizado!' : 'Veículo adicionado!', 'success');
                vehicleForm.style.display = 'none';
                vehiclesSection.style.display = 'block';
                loadVehicles();
            } else {
                const error = await response.json();
                showMessage(error.message || 'Erro ao salvar veículo', 'error');
            }
        } catch (error) {
            showMessage('Erro de conexão', 'error');
        }
    });

    // Carregar veículos
    async function loadVehicles() {
        try {
            const response = await apiRequest('/api/vehicles');
            if (response.ok) {
                const vehicles = await response.json();
                displayVehicles(vehicles);
            } else {
                showMessage('Erro ao carregar veículos', 'error');
            }
        } catch (error) {
            showMessage('Erro de conexão', 'error');
        }
    }

    // Exibir veículos
    function displayVehicles(vehicles) {
        vehiclesList.innerHTML = '';
        vehicles.forEach(vehicle => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${vehicle.placa}</strong> - ${vehicle.modelo}
                <button onclick="editVehicle(${vehicle.id})">Editar</button>
                <button onclick="deleteVehicle(${vehicle.id})">Excluir</button>
            `;
            vehiclesList.appendChild(li);
        });
    }

    // Editar veículo (função global para onclick)
    window.editVehicle = function(id) {
        editingVehicleId = id;
        // Carregar dados do veículo e preencher formulário
        apiRequest(`/api/vehicles/${id}`).then(response => {
            if (response.ok) {
                response.json().then(vehicle => {
                    document.getElementById('placa').value = vehicle.placa;
                    document.getElementById('modelo').value = vehicle.modelo;
                    document.getElementById('motor').value = vehicle.motor;
                    document.getElementById('observacoes').value = vehicle.observacoes;
                    formTitle.textContent = 'Editar Veículo';
                    vehicleForm.style.display = 'block';
                    vehiclesSection.style.display = 'none';
                });
            }
        });
    };

    // Deletar veículo
    window.deleteVehicle = async function(id) {
        if (confirm('Tem certeza que deseja excluir este veículo?')) {
            try {
                const response = await apiRequest(`/api/vehicles/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    showMessage('Veículo excluído!', 'success');
                    loadVehicles();
                } else {
                    showMessage('Erro ao excluir veículo', 'error');
                }
            } catch (error) {
                showMessage('Erro de conexão', 'error');
            }
        }
    };

    // Funções para alternar views
    function showDashboard() {
        loginSection.style.display = 'none';
        dashboard.style.display = 'block';
    }

    function showLogin() {
        dashboard.style.display = 'none';
        loginSection.style.display = 'block';
        vehiclesSection.style.display = 'none';
        vehicleForm.style.display = 'none';
    }
});