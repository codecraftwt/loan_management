import { GoDotFill } from "react-icons/go";
import { CiCircleInfo } from "react-icons/ci";
import { LuKey } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { LuShieldCheck } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { LuInfo } from "react-icons/lu";
import { useEffect, useState } from "react";
import { LuEyeOff } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../store/authSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";


export function ChangePassword() {

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const dispatch = useDispatch();
  const { isLoading, error, successMessage } = useSelector((state) => state.auth);

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);


  const handleSubmit = async (e) => {
    e.preventDefault();


    //admin not write all fields
    if (!form.currentPassword.trim()) {
      setToast({ type: "error", message: "Current password is required!" });
      return;
    }
    if (!form.newPassword.trim()) {
      setToast({ type: "error", message: "New password is required!" });
      return;
    }
    if (!form.confirmNewPassword.trim()) {
      setToast({ type: "error", message: "Confirm password is required!" });
      return;
    }

    // Frontend validation
    if (form.newPassword !== form.confirmNewPassword) {
      setToast({ type: "error", message: "New password and confirm password do not match!" });
      return;
    }

    if (form.newPassword.length < 6) {
      setToast({ type: "error", message: "Password must be at least 6 characters long!" });
      return;
    }

    //new password and current password cannot be same as
    if (form.currentPassword === form.newPassword) {
      setToast({ type: "error", message: "New password cannot be the same as current password!" });
      return;
    }

    try {
      await dispatch(changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        confirmNewPassword: form.confirmNewPassword,
      })).unwrap();
      setToast({ type: "success", message: "Password changed successfully!" });
      setForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (error) {
      setToast({ type: "error", message: error || "Failed to change password. Please check your current password." });
    }
  }

  return (
    <div className="p-4 md:p-12 bg-[#F8FAFC] min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        {/* toast message */}
        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 animate-fade-in">
            <div className={`px-6 py-3 rounded-xl shadow-lg text-white font-medium flex items-center gap-3 ${toast.type === 'success' ? 'bg-green-600 border border-green-700' : 'bg-red-600 border border-red-700'
              }`}>
              {toast.type === 'success' ? (
                <IoMdCheckmarkCircleOutline className="w-6 h-6" />
              ) : (
                <AiOutlineCloseCircle className="w-6 h-6" />
              )}
              <span>{toast.message}</span>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Security Settings</h1>
          <p className="text-slate-500 mt-1">Manage your administrative credentials and security preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Form Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                  <LuShieldCheck className="text-indigo-600" />
                  Update Password
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-6 md:p-8 space-y-6">
                  {/* Current Password */}
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Current Password
                    </label>
                    <div className="relative flex items-center transition-all duration-200 border border-slate-200 rounded-xl bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50">
                      <div className="pl-4 text-slate-400 group-focus-within:text-indigo-600">
                        <LuKey size={20} />
                      </div>
                      <input
                        type={showCurrent ? "text" : "password"}
                        value={form.currentPassword}
                        onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                        placeholder="••••••••••••"
                        className="w-full px-4 py-4 outline-none text-slate-700 bg-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors cursor-pointer"
                      >
                        {showCurrent ? <LuEye size={20} /> : <LuEyeOff size={20} />}
                      </button>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* New Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        New Password
                      </label>
                      <div className="relative flex items-center transition-all duration-200 border border-slate-200 rounded-xl bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50">
                        <input
                          type={showNew ? "text" : "password"}
                          value={form.newPassword}
                          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                          placeholder="New password"
                          className="w-full px-4 py-4 outline-none text-slate-700 bg-transparent rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors cursor-pointer"
                        >
                          {showNew ? <LuEye size={20} /> : <LuEyeOff size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative flex items-center transition-all duration-200 border border-slate-200 rounded-xl bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50">
                        <input
                          type={showConfirm ? "text" : "password"}
                          value={form.confirmNewPassword}
                          onChange={(e) => setForm({ ...form, confirmNewPassword: e.target.value })}
                          placeholder="Confirm password"
                          className="w-full px-4 py-4 outline-none text-slate-700 bg-transparent rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors cursor-pointer"
                        >
                          {showConfirm ? <LuEye size={20} /> : <LuEyeOff size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-end">
                  <button className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-200 rounded-xl transition-all cursor-pointer">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-10 py-3 font-semibold rounded-xl transition-all cursor-pointer ${isLoading
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700 text-white"
                      }`}
                  >
                    {isLoading ? "Changing Password..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>



          {/* Sidebar Info Column */}
          <div className="space-y-6">
            <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-indigo-200">
                  <LuInfo size={18} />
                  <span className="text-sm font-bold uppercase tracking-widest">Requirements</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "At least 6 characters long",
                    "Mix uppercase & lowercase letters",
                    "Include numbers and symbols",
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-indigo-100/90">
                      <GoDotFill className="mt-1 text-indigo-400" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-800 rounded-full opacity-50"></div>
            </div>

            <div className="p-6 border border-slate-200 rounded-2xl bg-white">
              <h3 className="text-sm font-bold text-slate-800 mb-2">Need Help?</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                If you're having trouble changing your password, please contact the system administrator or visit our help center.
              </p>
              <a href="/support" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-4">
                Contact Support
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}