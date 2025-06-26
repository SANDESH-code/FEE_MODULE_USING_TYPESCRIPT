import React, { useState } from 'react';
import {
  FaCreditCard, FaDownload, FaFileInvoice, FaMoneyBillWave,
  FaCheckCircle, FaClock, FaSearch, FaUserGraduate, FaCalendarAlt,
  FaWallet, FaPrint
} from 'react-icons/fa';

// Mock data for fees and transactions
const studentInfo = {
  name: "Dharam Chand Patle",
  id: "STU2025001",
  program: "Computer Science",
  balance: 2500,
  dueDate: "2025-07-15",
  semester: "Spring 2025"
};

const feeBreakdown = [
  { type: "Tuition Fee", amount: 8000, paid: 6000, due: 2000 },
  { type: "Laboratory Fee", amount: 1000, paid: 800, due: 200 },
  { type: "Library Fee", amount: 500, paid: 400, due: 100 },
  { type: "Development Fee", amount: 1000, paid: 800, due: 200 }
];

const recentTransactions = [
  {
    id: "TXN001",
    date: "2025-06-20",
    amount: 1000,
    type: "Payment",
    status: "Completed",
    method: "Credit Card"
  },
  {
    id: "TXN002",
    date: "2025-06-15",
    amount: 500,
    type: "Late Fee",
    status: "Pending",
    method: "Bank Transfer"
  },
  {
    id: "TXN003",
    date: "2025-06-10",
    amount: 2000,
    type: "Payment",
    status: "Completed",
    method: "Online Payment"
  }
];

const upcomingPayments = [
  {
    id: "UP001",
    dueDate: "2025-07-15",
    amount: 1500,
    description: "Tuition Fee Installment"
  },
  {
    id: "UP002",
    dueDate: "2025-07-30",
    amount: 500,
    description: "Laboratory Fee"
  }
];

export default function FeesPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toISOString());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toISOString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-10 w-full max-w-xl">
        <h3 className="text-2xl font-bold mb-6">Make Payment</h3>
        <div className="space-y-6">
          <div className="flex gap-6">
            <button
              className={`flex-1 py-3 px-6 rounded text-lg ${
                paymentMethod === 'card'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => setPaymentMethod('card')}
            >
              <FaCreditCard className="inline mr-2" /> Card
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded text-lg ${
                paymentMethod === 'bank'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
              onClick={() => setPaymentMethod('bank')}
            >
              <FaMoneyBillWave className="inline mr-2" /> Bank
            </button>
          </div>
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-3 border rounded text-lg"
          />
          <input
            type="text"
            placeholder="Reference Number"
            className="w-full p-3 border rounded text-lg"
          />
          <div className="flex gap-3 justify-end">
            <button
              className="px-6 py-2 bg-gray-200 rounded text-base"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded text-base"
              onClick={() => {
                alert('Payment processed successfully!');
                setShowPaymentModal(false);
              }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Filtering
  const filteredTransactions = recentTransactions.filter(txn => {
    const matchesSearch = txn.id.toLowerCase().includes(searchQuery.toLowerCase())
      || txn.method.toLowerCase().includes(searchQuery.toLowerCase())
      || txn.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all"
      || (filterStatus === "completed" && txn.status === "Completed")
      || (filterStatus === "pending" && txn.status === "Pending");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {showPaymentModal && <PaymentModal />}
      <div className="w-full max-w-[1200px] min-h-[90vh] bg-white rounded-2xl shadow p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Fees Management</h1>
            <p className="text-gray-500 text-lg">
              {new Date(currentDateTime).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-3 text-lg hover:bg-blue-700"
            >
              <FaCreditCard /> Make Payment
            </button>
            <button
              onClick={() => alert('Downloading statement...')}
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg flex items-center gap-3 text-lg hover:bg-gray-200"
            >
              <FaDownload /> Statement
            </button>
          </div>
        </div>
        {/* Student Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-blue-50 p-6 rounded-lg flex items-center gap-4">
            <FaUserGraduate className="text-blue-600 text-3xl" />
            <div>
              <p className="text-lg text-gray-600">Student ID</p>
              <p className="font-semibold text-xl">{studentInfo.id}</p>
            </div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg flex items-center gap-4">
            <FaWallet className="text-green-600 text-3xl" />
            <div>
              <p className="text-lg text-gray-600">Balance Due</p>
              <p className="font-semibold text-xl">${studentInfo.balance}</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg flex items-center gap-4">
            <FaCalendarAlt className="text-yellow-600 text-3xl" />
            <div>
              <p className="text-lg text-gray-600">Next Due Date</p>
              <p className="font-semibold text-xl">{studentInfo.dueDate}</p>
            </div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg flex items-center gap-4">
            <FaFileInvoice className="text-purple-600 text-3xl" />
            <div>
              <p className="text-lg text-gray-600">Semester</p>
              <p className="font-semibold text-xl">{studentInfo.semester}</p>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="border-b mb-10">
          <div className="flex space-x-10 text-xl">
            {['overview', 'transactions', 'upcoming', 'history'].map((tab) => (
              <button
                key={tab}
                className={`pb-2 px-2 ${
                  activeTab === tab
                    ? 'border-b-4 border-blue-600 text-blue-600 font-bold'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            {/* Fee Breakdown */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold text-2xl mb-6">Fee Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-4 text-left">Type</th>
                      <th className="px-6 py-4 text-right">Amount</th>
                      <th className="px-6 py-4 text-right">Paid</th>
                      <th className="px-6 py-4 text-right">Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeBreakdown.map((fee, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-6 py-4">{fee.type}</td>
                        <td className="px-6 py-4 text-right">${fee.amount}</td>
                        <td className="px-6 py-4 text-right text-green-600">
                          ${fee.paid}
                        </td>
                        <td className="px-6 py-4 text-right text-red-600">
                          ${fee.due}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Payment History Chart (placeholder) */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-semibold text-2xl mb-6">Payment History</h3>
              <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p className="text-gray-400 flex items-center gap-3 text-xl">
                  <FaFileInvoice className="text-3xl" /> Payment history visualization
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'transactions' && (
          <div>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-4 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full pl-12 pr-4 py-3 border rounded-lg text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                className="px-6 py-3 border rounded-lg text-lg"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            {/* Transactions Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left">Transaction ID</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4 text-left">Method</th>
                    <th className="px-6 py-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-t">
                      <td className="px-6 py-4 font-medium">
                        {transaction.id}
                      </td>
                      <td className="px-6 py-4">{transaction.date}</td>
                      <td className="px-6 py-4 text-right">
                        ${transaction.amount}
                      </td>
                      <td className="px-6 py-4">{transaction.method}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-lg font-medium ${
                            transaction.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {transaction.status === 'Completed' ? (
                            <FaCheckCircle className="mr-2" />
                          ) : (
                            <FaClock className="mr-2" />
                          )}
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredTransactions.length === 0 && (
                <p className="text-center text-gray-400 mt-8 text-xl">No transactions found.</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'upcoming' && (
          <div className="space-y-8">
            {upcomingPayments.map((payment) => (
              <div
                key={payment.id}
                className="bg-white border rounded-lg p-6 flex items-center justify-between text-lg"
              >
                <div>
                  <h4 className="font-medium text-xl">{payment.description}</h4>
                  <p className="text-lg text-gray-500">
                    Due: {payment.dueDate}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl">${payment.amount}</p>
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="text-blue-600 text-lg hover:underline"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-semibold text-2xl mb-6 flex items-center gap-3">
              <FaFileInvoice className="text-blue-600" /> Full Payment History
            </h3>
            <div className="h-40 bg-gray-50 rounded flex items-center justify-center">
              <p className="text-gray-400 flex items-center gap-3 text-xl">
                <FaFileInvoice className="text-3xl" /> Download your full statement or print
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => alert('Downloading statement...')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-3 text-lg hover:bg-blue-700"
              >
                <FaDownload /> Download Statement
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg flex items-center gap-3 text-lg hover:bg-gray-200"
              >
                <FaPrint /> Print
              </button>
            </div>
          </div>
        )}
        {/* Footer */}
        <footer className="text-center text-gray-400 text-base mt-12 pb-8">
          <span className="mr-2">✂️ Designed and developed by ZoaTeam</span>
          <span>© 2025 Zoa Innovation</span>
        </footer>
      </div>
    </div>
  );
}