document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  function loginPage() {
    app.innerHTML = `
      <div class="h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
          <form id="loginForm">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
              </label>
              <input 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                id="username" 
                type="text" 
                required
              >
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                id="password" 
                type="password" 
                required
              >
            </div>
            <div class="flex items-center justify-between">
              <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                type="submit"
              >
                Sign In
              </button>
              <button 
                type="button" 
                class="text-blue-500 hover:text-blue-700"
                onclick="registerPage()"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
          // Store token and username in localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          
          // Redirect to homepage
          homepage();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
      }
    });
  }

  function registerPage() {
    app.innerHTML = `
      <div class="h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
          <form id="registerForm">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
              </label>
              <input 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                id="username" 
                type="text" 
                required
              >
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                id="email" 
                type="email" 
                required
              >
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                id="password" 
                type="password" 
                required
              >
            </div>
            <div class="flex items-center justify-between">
              <button 
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
                type="submit"
              >
                Register
              </button>
              <button 
                type="button" 
                class="text-blue-500 hover:text-blue-700"
                onclick="loginPage()"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registration successful! Please log in.');
          loginPage();
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration');
      }
    });
  }

  // Logout function
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    loginPage();
  }

  // Initial load
  const token = localStorage.getItem('token');
  token ? homepage() : loginPage();

  // Modify homepage to check authentication
  function homepage() {
    const token = localStorage.getItem('token');
    if (!token) {
      loginPage();
      return;
    }
    app.innerHTML = `
    <section class="h-screen w-screen flex flex-col items-center justify-center relative z-10">
      <div class="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white gradient-background"></div>
      <h1 class="mb-4 text-3xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white relative z-20">
        Welcome to the Basic Banking App
      </h1>
      <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200 relative z-20">
        Manage your customers and transactions effortlessly.
      </p>
      <div class="space-x-4 relative z-20">
        <button class="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600" onclick="viewCustomers()">
          View All Customers
        </button>
        <button class="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600" onclick="viewTransfers()">
          View All Transfers
        </button>
        <button class="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600" onclick="logout()">
          Logout
        </button>
      </div>
    </section>
  `;
}

  

  async function fetchCustomers() {
    const response = await fetch('http://localhost:3000/api/customers');
    return await response.json();
  }

  async function fetchTransfers() {
    const response = await fetch('http://localhost:3000/api/transfers');
    return await response.json();
  }

  async function createCustomer() {
  app.innerHTML = `
    <div class="container mx-auto mt-10 max-w-md">
      <h1 class="text-2xl font-bold mb-6">Create New Customer</h1>
      <form id="createCustomerForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" required>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="balance">
            Initial Balance
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="balance" name="balance" type="number" min="0" step="0.01">
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Create Customer
          </button>
          <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded" onclick="viewCustomers()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('createCustomerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      balance: parseFloat(formData.get('balance') || 0)
    };

    try {
      const response = await fetch('http://localhost:3000/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Customer created successfully!');
        viewCustomers();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the customer');
    }
  });
}

async function editCustomer(customerId) {
  try {
    // Fetch the specific customer details
    const response = await fetch(`http://localhost:3000/api/customers/${customerId}`);
    const customer = await response.json();

    app.innerHTML = `
      <div class="container mx-auto mt-10 max-w-md">
        <h1 class="text-2xl font-bold mb-6">Edit Customer</h1>
        <form id="editCustomerForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <input type="hidden" id="customerId" name="customerId" value="${customer._id}">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
              Name
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="name" 
              name="name" 
              type="text" 
              value="${customer.name}" 
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="email" 
              name="email" 
              type="email" 
              value="${customer.email}" 
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="balance">
              Current Balance
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="balance" 
              name="balance" 
              type="number" 
              value="${customer.balance}" 
              min="0" 
              step="0.01"
            >
          </div>
          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Update Customer
            </button>
            <button type="button" class="bg-gray-500 text-white px-4 py-2 rounded" onclick="viewCustomers()">
              Cancel
            </button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('editCustomerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        balance: parseFloat(formData.get('balance'))
      };

      try {
        const response = await fetch(`http://localhost:3000/api/customers/${customerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
          alert('Customer updated successfully!');
          viewCustomers();
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the customer');
      }
    });
  } catch (error) {
    console.error('Error fetching customer details:', error);
    alert('Failed to load customer details');
  }
}

async function deleteCustomer(customerId) {
  if (confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
    try {
      const response = await fetch(`http://localhost:3000/api/customers/${customerId}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (response.ok) {
        alert('Customer deleted successfully!');
        viewCustomers();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the customer');
    }
  }
}

async function viewCustomers() {
  const customers = await fetchCustomers();
  app.innerHTML = `
    <div class="flex justify-between justify-center my-8">
      <h1 class="text-2xl font-bold mb-4 text-left ml-24">CUSTOMER'S RECORD</h1>
      <div class="space-x-4">
        <button class="mt-4 bg-green-500 text-white px-4 py-2 rounded" onclick="createCustomer()">Add New Customer</button>
        <button class="mt-4 bg-gray-500 text-white px-4 py-2 rounded" onclick="homepage()">Back to Homepage</button>
      </div>
    </div>
    <div class="relative shadow-md sm:rounded-lg z-20 ml-24 mb-10">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">NAME</th>
            <th scope="col" class="px-6 py-3">EMAIL</th>
            <th scope="col" class="px-6 py-3">CURRENT BALANCE</th>
            <th scope="col" class="px-6 py-3">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          ${customers
            .map(
              (customer) => `
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${customer.name}</td>
              <td class="px-6 py-3">${customer.email}</td>
              <td class="px-6 py-3">$${customer.balance}</td>
              <td class="px-6 py-3 space-x-2">
                <button type="button" class="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-100 inline-block" onclick="viewCustomer('${customer._id}')">View</button>
                <button type="button" class="px-3 py-2 text-sm font-medium text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-100 inline-block" onclick="editCustomer('${customer._id}')">Edit</button>
                <button type="button" class="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-100 inline-block" onclick="deleteCustomer('${customer._id}')">Delete</button>
              </td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    </div>
  `;
}

  async function viewCustomer(id) {
    const response = await fetch(`http://localhost:3000/api/customers/${id}`);
    const customer = await response.json();
    app.innerHTML = `
    <section class="h-screen flex flex-col items-center justify-center p-4">
      <div class="w-full max-w-lg">
        <h1 class="text-2xl font-bold mb-4 text-center">${customer.name}'s Account Details</h1>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Email:</td>
                <td class="px-3 py-4">${customer.email}</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Current Balance:</td>
                <td class="px-3 py-4">$${customer.balance}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-between mt-4">
          <button class="bg-green-500 text-white px-4 py-2 rounded" onclick="initiateTransfer('${customer._id}')">Transfer Money</button>
          <button class="bg-gray-500 text-white px-4 py-2 rounded" onclick="viewCustomers()">Back to Customers</button>
        </div>
      </div>
    </section>
    `;
  }

  async function initiateTransfer(fromId) {
    const customers = await fetchCustomers();
    const fromCustomer = customers.find((c) => c._id === fromId);
    const filteredCustomers = customers.filter((c) => c._id !== fromId);
    app.innerHTML = `
    <div id="alertContainer" class="fixed top-2 left-0 w-full z-50 flex justify-center"></div>
    <h1 class="text-2xl font-bold mb-10 text-center mt-16 max-w-sm mx-auto">TRANSFER MONEY</h1>
      <form id="transferForm" class="max-w-sm space-y-4 mx-auto">
        <div class="mb-5">
          <label for="from" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From:</label>
          <input type="text" id="from" name="fromName" value="${
            fromCustomer.name
          } (Balance: $${
      fromCustomer.balance
    })" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
        </div>
        <input type="hidden" name="from" value="${fromId}">
        <div class="mb-5">
          <label for="to" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Customer to Transfer To:</label>
          <select name="to" id="to" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onchange="populateEmail(this.value)">
          ${filteredCustomers
            .map(
              (customer, index) => `
                <option value="${customer._id}" ${
                index === 0 ? 'selected' : ''
              }>${customer.name} (Balance: $${customer.balance})</option>
              `
            )
            .join('')}
        </select>
        </div>
        <div class="mb-5">
          <label for="emailField" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input type="text" id="emailField" name="email" value="${
            filteredCustomers.length > 0 ? filteredCustomers[0].email : ''
          }" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
        </div>
        <div class="mb-5">
          <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount:</label>
          <input type="number" name="amount" id="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="1" required>
        </div>
        <div class="flex justify-between mb-5">
          <button type="submit" class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-100 rounded w-1/2 px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Transfer</button>

          <div class="w-2"></div> <!-- Add a gap of width 2 -->
          
          <button class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded  w-1/2 px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" onclick="viewCustomers()">Back to Customers</button>
        </div>
        <button type="button" class="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 w-full" onclick="viewTransfers()">View All Transfers</button>
      </form>
    </div>
    `;

    document
      .getElementById('transferForm')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
          from: formData.get('from'),
          to: formData.get('to'),
          amount: parseInt(formData.get('amount')),
        };

        const response = await fetch('http://localhost:3000/api/transfers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const alertContainer = document.getElementById('alertContainer');

        if (response.ok) {
          const successAlert = document.createElement('div');
          successAlert.classList.add(
            'inline-flex',
            'items-center',
            'p-4',
            'mb-4',
            'text-sm',
            'text-green-800',
            'rounded-lg',
            'bg-green-50',
            'dark:bg-gray-800',
            'dark:text-green-400'
          );
          successAlert.setAttribute('role', 'alert');
          successAlert.innerHTML = `
    <span class="sr-only">Success</span>
    <div class="inline">
      <span class="font-medium">Congratulations! </span> Transfer Successful ✅
    </div>
  `;
          alertContainer.appendChild(successAlert);

          setTimeout(() => {
            successAlert.remove();
            // viewTransfers();
          }, 5000);
        } else {
          // alert('Oops! Transfer Failed ❌');
          const errorAlert = document.createElement('div');
          errorAlert.classList.add(
            'flex',
            'items-center',
            'p-4',
            'mb-4',
            'text-sm',
            'text-red-800',
            'rounded-lg',
            'bg-red-50',
            'dark:bg-gray-800',
            'dark:text-red-400'
          );
          errorAlert.setAttribute('role', 'alert');
          errorAlert.innerHTML = `
            <span class="sr-only">Error</span>
            <div class="inline">
              <span class="font-medium">Error! </span> Transfer Failed ❌
            </div>
          `;
          alertContainer.appendChild(errorAlert);
          setTimeout(() => {
            errorAlert.remove();
          }, 5000);
        }
      });
  }

  async function populateEmail(customerId) {
    const customers = await fetchCustomers();
    const selectedCustomer = customers.find((c) => c._id === customerId);
    document.getElementById('emailField').value = selectedCustomer.email;
  }

  async function viewTransfers() {
    const transfers = await fetchTransfers();
    app.innerHTML = `
    <div class="flex justify-between justify-center my-8">
      <h1 class="text-2xl font-bold mb-4 text-left ml-24">TRANSACTIONS HISTORY</h1>
      <button class="mt-4 bg-gray-500 text-white px-4 py-2 rounded" onclick="homepage()">Back to Homepage</button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg ml-24 mb-10">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">From (Sender)</th>
              <th scope="col" class="px-6 py-3">To (Receiver)</th>
              <th scope="col" class="px-6 py-3">Amount Transferred</th>
              <th scope="col" class="px-6 py-3">Transaction Date & Time</th>
            </tr>
          </thead>
          <tbody>
            ${transfers
              .map(
                (transfer) => `
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-3">${
                  transfer.from ? transfer.from.name : 'Unknown'
                } <br>(${transfer.from ? transfer.from.email : 'Unknown'})</td>
                <td class="px-6 py-3">${
                  transfer.to ? transfer.to.name : 'Unknown'
                } <br>(${transfer.to ? transfer.to.email : 'Unknown'})</td>
                <td class="px-6 py-3">$${transfer.amount}</td>
                <td class="px-6 py-3">${new Date(
                  transfer.date
                ).toLocaleString()}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
      
    
    `;
  }

  // Initializing the homepage
  homepage();

  // Exposing functions to the global window scope
  window.viewCustomer = viewCustomer;
  window.initiateTransfer = initiateTransfer;
  window.viewTransfers = viewTransfers;
  window.viewCustomers = viewCustomers;
  window.homepage = homepage;
  window.populateEmail = populateEmail;
  // Add these to the window global scope
  window.createCustomer = createCustomer;
  window.deleteCustomer = deleteCustomer;
  window.editCustomer = editCustomer;
  window.loginPage = loginPage;
  window.registerPage = registerPage;
  window.homepage = homepage;
  window.logout = logout;
});