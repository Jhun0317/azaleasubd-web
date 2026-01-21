import { createPayment } from "../actions";

export default function PayNowPage() {
  return (
    <div className="max-w-md p-6 bg-white rounded-xl border">
      <h1 className="text-2xl font-bold mb-2">Pay Monthly Dues</h1>
      <p className="text-slate-500 mb-6">Amount due: ₱500</p>

      <form action={createPayment}>
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700"
        >
          Proceed to Payment
        </button>
      </form>
    </div>
  );
}
