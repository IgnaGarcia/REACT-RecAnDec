import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <h1 className="text-3xl font-bold font-ss">
      Hello world! mucho texto para verlo
    </h1>
    <button class="bg-back-100 hover:bg-primary-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      Button
    </button>

    <button class="bg-back-100 hover:bg-primary-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      Button
    </button>

    
    <aside class="w-64" aria-label="Sidebar">
      <div class="overflow-y-auto py-4 px-3 bg-back-800">
          <ul class="space-y-2">
            <li>
                <a href="#" class="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700">
                  <span class="ml-3">Dashboard</span>
                </a>
            </li>
            <li>
                <button type="button" class="flex items-center p-2 w-full text-base font-normal rounded-lg group text-white" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                      <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>E-commerce</span>
                </button>
                <ul id="dropdown-example" class="py-2 space-y-2">
                      <li>
                        <a href="#" class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                      </li>
                      <li>
                        <a href="#" class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                      </li>
                      <li>
                        <a href="#" class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                      </li>
                </ul>
              </li>
              <li>
                  <button type="button" class="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                        <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>E-commerce</span>
                  </button>
                  <ul id="dropdown-example" class="py-2 space-y-2">
                        <li>
                          <a href="#" class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Products</a>
                        </li>
                        <li>
                          <a href="#" class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Billing</a>
                        </li>
                        <li>
                          <a href="#" class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Invoice</a>
                        </li>
                  </ul>
              </li>
          </ul>
      </div>
    </aside>


    <table className="table-auto border-collapse border">
      <thead>
        <tr>
          <th className="border">Song</th>
          <th className="border">Artist</th>
          <th className="border">Year</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td className="border">Malcolm Lockyer</td>
          <td className="border">1961</td>
        </tr>
        <tr>
          <td className="border">Witchy Woman</td>
          <td className="border">The Eagles</td>
          <td className="border">1972</td>
        </tr>
        <tr>
          <td className="border">Shining Star</td>
          <td className="border">Earth, Wind, and Fire</td>
          <td className="border">1975</td>
        </tr>
      </tbody>
    </table>
  </React.StrictMode>
);
