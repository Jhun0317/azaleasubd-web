// 1. Add this import at the top of your file
import { approvePayment } from "@/app/actions/payment-actions";
import { toast } from "sonner"; // Optional: if you have a toast library for notifications

// ... inside your ReviewPayments function ...

<td className="px-6 py-5 text-right">
  <div className="flex justify-end gap-2">
    {/* APPROVE BUTTON */}
    <button 
      onClick={async () => {
        const confirmApprove = confirm(`Approve payment for ${pay.resident}?`);
        if (confirmApprove) {
          const result = await approvePayment(pay.id); // 'pay.id' should be the Resident's ID
          if (result.success) {
            alert("Payment Verified! Resident dashboard updated.");
          } else {
            alert("Error: " + result.error);
          }
        }
      }}
      className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm shadow-emerald-100"
      title="Approve Payment"
    >
      <Check size={18} />
    </button>

    {/* REJECT BUTTON */}
    <button 
      className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm shadow-rose-100"
      title="Reject Payment"
    >
      <X size={18} />
    </button>
  </div>
</td>
