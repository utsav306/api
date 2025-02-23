// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from "react";
import * as echarts from "echarts";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedApiId, setExpandedApiId] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const categories = [
    "All",
    "Task Management",
    "Optimization",
    "Analytics",
    "Resource Management",
    "Communication",
    "Integration",
    "Smart City",
  ];

  const apis = [
    {
      id: "1",
      name: "Task Management API",
      description:
        "Comprehensive API for task creation, updating, and tracking within UrbNexus. Supports task prioritization, deadlines, and inter-departmental assignments.",
      category: "Task Management",
      price: "Premium",
      cost: 299,
      endpoints: [
        {
          method: "POST",
          path: "/api/tasks/create",
          description: "Create a new task",
        },
        {
          method: "GET",
          path: "/api/tasks",
          description: "Retrieve all tasks",
        },
        {
          method: "GET",
          path: "/api/tasks/{task_id}",
          description: "Get details of a specific task",
        },
        {
          method: "PATCH",
          path: "/api/tasks/{task_id}/status",
          description: "Update task status",
        },
        {
          method: "DELETE",
          path: "/api/tasks/{task_id}",
          description: "Delete a task",
        },
      ],
      metrics: { users: 0, requests: 0, uptime: "100%" },
    },
    {
      id: "2",
      name: "Task Merge & Conflict Resolution API",
      description:
        "Automated task conflict detection and merging mechanism to optimize urban resource management.",
      category: "Optimization",
      price: "Enterprise",
      cost: 499,
      endpoints: [
        {
          method: "POST",
          path: "/api/tasks/merge-check",
          description: "Check and merge overlapping tasks",
        },
        {
          method: "GET",
          path: "/api/tasks/conflicts",
          description: "Retrieve conflicting tasks",
        },
      ],
      metrics: { users: 0, requests: 0, uptime: "100%" },
    },
    {
      id: "3",
      name: "Resource Allocation API",
      description:
        "Smart resource allocation for urban infrastructure projects. Automatically assigns workforce and materials based on task priority and availability.",
      category: "Resource Management",
      price: "Pro",
      cost: 399,
      endpoints: [
        {
          method: "POST",
          path: "/api/resources/allocate",
          description: "Allocate resources for a task",
        },
        {
          method: "GET",
          path: "/api/resources/availability",
          description: "Check available resources",
        },
      ],
      metrics: { users: 0, requests: 0, uptime: "100%" },
    },
    {
      id: "4",
      name: "Inter-Departmental Communication API",
      description:
        "Facilitates official communication and collaboration between different city departments.",
      category: "Communication",
      price: "Premium",
      cost: 199,
      endpoints: [
        {
          method: "POST",
          path: "/api/communications/send",
          description: "Send a message between departments",
        },
        {
          method: "GET",
          path: "/api/communications/history/{dept_id}",
          description: "Retrieve department communication history",
        },
      ],
      metrics: { users: 0, requests: 0, uptime: "100%" },
    },
    {
      id: "5",
      name: "Webhook Subscription API",
      description:
        "Enables third-party applications to receive real-time updates on task status changes.",
      category: "Integration",
      price: "Free",
      cost: 0,
      endpoints: [
        {
          method: "POST",
          path: "/api/webhooks/task-updates",
          description: "Subscribe to task update notifications",
        },
      ],
      metrics: { users: 0, requests: 0, uptime: "100%" },
    },
    {
      id: "6",
      name: "Department-Wise Task Assignment API",
      description:
        "Allows departments to manage tasks efficiently by assigning, tracking, and reviewing them.",
      category: "Task Management",
      price: "Premium",
      cost: 299,
      endpoints: [
        {
          method: "GET",
          path: "/api/departments/{dept_id}/tasks",
          description: "Fetch tasks assigned to a specific department",
        },
        {
          method: "POST",
          path: "/api/departments/review",
          description: "Submit a report on completed tasks for review",
        },
      ],
      metrics: { users: 0, requests: 0, uptime: "100%" },
    },
    {
      id: "7",
      name: "Urban Planning Data & Analytics API",
      description:
        "Provides insights on task distribution, resource utilization, and urban planning trends.",
      category: "Analytics",
      price: "Enterprise",
      cost: 599,
      endpoints: [
        {
          method: "GET",
          path: "/api/analytics/task-distribution",
          description: "Get insights on task distribution across the city",
        },
        {
          method: "GET",
          path: "/api/analytics/resource-utilization",
          description: "Analyze resource utilization trends",
        },
      ],
      metrics: { users: 0, requests: 0, uptime: "100%" },
    },
    {
      id: "8",
      name: "City Services Integration API",
      description:
        "Provides real-time traffic, weather, and environmental data for smart urban governance.",
      category: "Smart City",
      price: "Enterprise",
      cost: 599,
      endpoints: [
        {
          method: "GET",
          path: "/api/city-services/traffic-status",
          description: "Retrieve real-time traffic data",
        },
        {
          method: "GET",
          path: "/api/city-services/environmental-impact",
          description: "Analyze the environmental impact of projects",
        },
      ],
      metrics: { users: 0, requests: 0, uptime: "100%" },
    },
  ];

  useEffect(() => {
    const chartElement = document.getElementById("apiUsageChart");
    if (chartElement) {
      const chart = echarts.init(chartElement);
      const option = {
        animation: false,
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147],
            type: "line",
            smooth: true,
          },
        ],
      };
      chart.setOption(option);
    }
  }, []);

  const filteredApis = apis.filter((api) => {
    const matchesSearch =
      api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      api.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || api.category === selectedCategory;
    const matchesPrice = api.cost >= priceRange[0] && api.cost <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                src="https://public.readdy.ai/ai/img_res/87af4ad16db5a3e3334058a984b7771b.jpg"
                alt="UrbNexus Logo"
                className="h-8"
              />
              <nav className="ml-10 flex space-x-8">
                {["Home", "APIs", "Documentation", "Pricing", "Support"].map(
                  (item) => (
                    <button
                      key={item}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium !rounded-button whitespace-nowrap"
                    >
                      {item}
                    </button>
                  ),
                )}
              </nav>
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap"
            >
              <i className="fas fa-user mr-2"></i>
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="bg-white border-b mb-4 hidden">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <i className="fas fa-search text-gray-400 mx-3"></i>
            <input
              type="text"
              placeholder="Search APIs..."
              className="flex-1 bg-transparent border-none outline-none text-sm h-12 py-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 mt-16">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors !rounded-button whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <h3 className="font-semibold mt-8 mb-4">Price Range</h3>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-2">
                Rs :{priceRange[0]} - Rs :{priceRange[1]}
              </div>
            </div>
          </div>

          {/* API Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6">
              {filteredApis.map((api) => (
                <div
                  key={api.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">{api.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          api.price === "Free"
                            ? "bg-green-100 text-green-800"
                            : api.price === "Premium"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {api.price}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{api.description}</p>

                    <div className="mt-4 flex items-center space-x-4">
                      {Object.entries(api.metrics).map(([key, value]) => (
                        <div key={key} className="text-sm text-gray-500">
                          <span className="font-medium">{value}</span> {key}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <button
                        onClick={() =>
                          setExpandedApiId(
                            expandedApiId === api.id ? null : api.id,
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 !rounded-button whitespace-nowrap"
                      >
                        View Details
                        <i
                          className={`fas fa-chevron-${
                            expandedApiId === api.id ? "up" : "down"
                          } ml-2`}
                        ></i>
                      </button>
                      {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap">
                        Try it now
                      </button> */}
                    </div>

                    {expandedApiId === api.id && (
                      <div className="mt-6 border-t pt-6">
                        <h4 className="font-semibold mb-4">Endpoints</h4>
                        <div className="space-y-3">
                          {api.endpoints.map((endpoint, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-3 rounded-lg"
                            >
                              <div className="flex items-center">
                                <span
                                  className={`px-2 py-1 rounded text-sm font-medium ${
                                    endpoint.method === "GET"
                                      ? "bg-green-100 text-green-800"
                                      : endpoint.method === "POST"
                                      ? "bg-blue-100 text-blue-800"
                                      : endpoint.method === "PUT"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {endpoint.method}
                                </span>
                                <code className="ml-3 text-sm">
                                  {endpoint.path}
                                </code>
                              </div>
                              <p className="mt-2 text-sm text-gray-600">
                                {endpoint.description}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <h4 className="font-semibold mb-4">
                            Usage Statistics
                          </h4>
                          <div
                            id="apiUsageChart"
                            style={{ height: "200px" }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About UrbNexus</h3>
              <p className="text-gray-400">
                Empowering developers with robust APIs for building
                next-generation applications.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {["Documentation", "API Reference", "Status Page", "Blog"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {["Help Center", "Contact Us", "Community", "FAQ"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">
                Stay updated with our latest API features and updates.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-700 rounded-l-lg px-4 py-2 text-sm border-none"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 UrbNexus. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              {/* <h3 className="text-xl font-semibold">Sign In</h3> */}
              {/* <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-gray-600 !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-times"></i>
              </button> */}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your password"
                />
              </div>
              {/* <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors !rounded-button whitespace-nowrap">
                Sign In
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
