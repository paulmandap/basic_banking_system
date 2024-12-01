document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');

  function homepage() {
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

  async function viewCustomers() {
    const customers = await fetchCustomers();
    app.innerHTML = `
      <div class="flex justify-between justify-center my-8">
        <h1 class="text-2xl font-bold mb-4 z-20 text-left ml-24">CUSTOMER'S RECORD</h1>
        <button class="mt-4 bg-gray-500 text-white px-4 py-2 rounded z-20 flex items-center" onclick="homepage()">Back to Homepage</button>
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
                <td class="px-6 py-3">
                  <button type="button" class="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-100 inline-block" onclick="viewCustomer('${customer._id}')">View</button>
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
});