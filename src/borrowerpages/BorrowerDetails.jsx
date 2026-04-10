import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiPhone, FiMail, FiUser } from "react-icons/fi";
import { MdOutlineCreditCard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBorrowerDetails } from "../store/lendersSlice";

export function BorrowerDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { borrowerId } = useParams();

  const dispatch = useDispatch();

const {
  selectedBorrower,
  borrowerDetailsLoading,
  borrowerDetailsError
} = useSelector((state) => state.lenders);

useEffect(() => {
  if (borrowerId) {
    dispatch(fetchBorrowerDetails(borrowerId));
  }
}, [borrowerId, dispatch]);

const borrower = selectedBorrower || state?.borrower;
  

 
  const lenderName = state?.lenderName;

  if (borrowerDetailsLoading) {
  return (
   
    <div className="flex items-center justify-center h-[60vh] bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500 border-solid"></div>
        <span className="ml-4 text-lg text-gray-600 font-medium">Loading borrower details...</span>
      </div>
  );
}

  // if not state then (direct URL access) to back 
  if (!borrower) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <p className="text-gray-500 text-lg">Borrower data not found.</p>
        <button onClick={() => navigate(-1)}
          className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl
            hover:bg-orange-600 transition-colors cursor-pointer">
          ← Go Back
        </button>
      </div>
    );
  }

  const formatDate = (iso) => {
    if (!iso) return "N/A";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });
  };

  const statusStyle = (status) => {
    if (status === "paid")      return "bg-green-100 text-green-700 border-green-200";
    if (status === "overdue")   return "bg-red-100 text-red-600 border-red-200";
    if (status === "part paid") return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-blue-100 text-blue-600 border-blue-200";
  };

  return (
    <div className="p-4 md:p-8">

      {/* Back */}
      <button onClick={() => navigate(-1)}
        className="mb-2 flex items-center gap-2 text-orange-600 font-bold hover:gap-4 transition-all cursor-pointer">
        ← Back to Borrowers
      </button>

      <div className="mb-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Borrower Details</h2>
      </div>

    

        {/* ── Profile Hero Card ── */}
        <div className="mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600" />
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Avatar */}
            <div className="w-15 h-15 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600
              flex items-center justify-center text-white text-3xl font-black shadow-md flex-shrink-0">
              {borrower.borrowerName?.charAt(0).toUpperCase() || "B"}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {borrower.borrowerName}
              </h1>
              {lenderName && (
                <p className="text-sm text-gray-500 mt-1">
                  Loans from lender: <span className="font-semibold text-orange-600">{lenderName}</span>
                </p>
              )}

              <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                {borrower.mobileNo && borrower.mobileNo !== "N/A" && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiPhone className="text-orange-500 flex-shrink-0" />
                    <span className="font-medium">{borrower.mobileNo}</span>
                  </div>
                )}
                {borrower.email && borrower.email !== "N/A" && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiMail className="text-orange-500 flex-shrink-0" />
                    <span className="font-medium">{borrower.email}</span>
                  </div>
                )}
                {borrower.aadhaarNumber && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MdOutlineCreditCard className="text-orange-500 flex-shrink-0" />
                    <span className="font-medium">
                      {borrower.aadhaarNumber.replace(/(\d{4})(\d{4})(\d{4})/, "$1 $2 $3")}
                    </span>
                  </div>
                )}
              </div>

              {/* Status badges */}
              <div className="flex gap-2 mt-4 justify-center md:justify-start flex-wrap">
                {borrower.hasOverdueLoan && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full
                    bg-red-100 text-red-600 border border-red-200">
                    ⚠ Has Overdue Loan
                  </span>
                )}
                {borrower.hasActiveLoan && !borrower.hasOverdueLoan && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full
                    bg-green-100 text-green-700 border border-green-200">
                    ✓ Active Borrower
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Loans",    value: borrower.totalLoansCount,                              color: "text-gray-900",   bg: "bg-white",       border: "border-fuchsia-100" },
            { label: "Total Amount",   value: `₹${borrower.totalLoanAmount?.toLocaleString()}`,      color: "text-orange-600", bg: "bg-fuchsia-50",   border: "border-fuchsia-100" },
            { label: "Total Paid",     value: `₹${borrower.totalPaidAmount?.toLocaleString()}`,      color: "text-green-600",  bg: "bg-green-50",    border: "border-green-100" },
            { label: "Remaining",      value: `₹${borrower.totalRemainingAmount?.toLocaleString()}`, color: "text-red-500",    bg: "bg-red-50",      border: "border-red-100" },
          ].map((s, i) => (
            <div key={i} className={`${s.bg} rounded-2xl p-5 border border-gray-200 shadow-sm`}>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{s.label}</p>
              <p className={`text-xl md:text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
        </div>

        {/* ── Loan History Table ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Loan History</h3>
            <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {borrower.loans?.length || 0} loans
            </span>
          </div>

          {borrower.loans?.length > 0 ? (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">#</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Total Paid</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Remaining</th>
                      {/* <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Given Date</th> */}
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">End Date</th>
                      <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {borrower.loans.map((loan, i) => (
                      <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-400 font-semibold">{i + 1}</td>
                        <td className="px-6 py-4 text-sm font-black text-gray-900">
                          ₹{loan.amount?.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-600">
                          ₹{loan.totalPaid?.toLocaleString() || "0"}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-red-500">
                          ₹{(loan.remainigAmount ?? loan.remainingAmount)?.toLocaleString() || "0"}
                        </td>
                        {/* <td className="px-6 py-4 text-sm text-gray-600">{formatDate(loan.loanGivenDate)}</td> */}
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDate(loan.loanEndDate)}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full
                            text-[10px] font-bold border ${statusStyle(loan.paymentStatus)}`}>
                            {loan.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  {/* Footer total */}
                  <tfoot>
                    <tr className="bg-gray-50 border-t-2 border-gray-200">
                      <td className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Total</td>
                      <td className="px-6 py-3 text-sm font-black text-gray-900">
                        ₹{borrower.totalLoanAmount?.toLocaleString()}
                      </td>
                      <td className="px-6 py-3 text-sm font-black text-green-600">
                        ₹{borrower.totalPaidAmount?.toLocaleString()}
                      </td>
                      <td className="px-6 py-3 text-sm font-black text-red-500">
                        ₹{borrower.totalRemainingAmount?.toLocaleString()}
                      </td>
                      <td colSpan={3} />
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-50">
                {borrower.loans.map((loan, i) => (
                  <div key={i} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-black text-gray-900">
                        ₹{loan.amount?.toLocaleString()}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusStyle(loan.paymentStatus)}`}>
                        {loan.paymentStatus}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-400 font-semibold">Paid</span>
                        <p className="font-black text-green-600">₹{loan.totalPaid?.toLocaleString() || "0"}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">Remaining</span>
                        <p className="font-black text-red-500">
                          ₹{(loan.remainigAmount ?? loan.remainingAmount)?.toLocaleString() || "0"}
                        </p>
                      </div>
                      {/* <div>
                        <span className="text-gray-400 font-semibold">Given</span>
                        <p className="font-semibold text-gray-700">{formatDate(loan.loanGivenDate)}</p>
                      </div> */}
                      <div>
                        <span className="text-gray-400 font-semibold">Ends</span>
                        <p className="font-semibold text-gray-700">{formatDate(loan.loanEndDate)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-gray-400">No loans found.</div>
          )}
        </div>

      
    </div>
  );
}