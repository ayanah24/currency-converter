import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [converted, setConverted] = useState(0);

  const { data: currencyInfo, loading } = useCurrencyInfo(from);
  const options = ["usd", "inr", ...Object.keys(currencyInfo || {})];

  const convert = () => {
    if (currencyInfo[to]) {
      setConverted((amount * currencyInfo[to]).toFixed(2));
    }
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(converted);
    setConverted(amount);
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2021/05/27/02/07/gamestop-6286877_1280.jpg')",
      }}
    >
      {/* Overlay for dimming background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md mx-auto p-6 bg-gradient-to-br from-white/40 to-white/20 border border-white/30 rounded-2xl shadow-2xl backdrop-blur-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-white drop-shadow">
          💱 Currency Converter
        </h1>
        <p className="text-center text-white/80 mb-6 text-sm">
          Convert currencies in real-time with up-to-date exchange rates
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-4"
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={setFrom}
            selectCurrency={from}
            onAmountChange={setAmount}
            className="bg-white/70"
          />

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="flex items-center gap-2 border border-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white font-medium shadow-md"
            >
              🔁 Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={converted}
            currencyOptions={options}
            onCurrencyChange={setTo}
            selectCurrency={to}
            amountDisable
            className="bg-white/70"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg px-4 py-3 rounded-lg mt-4 shadow-lg transition-all"
            disabled={loading}
          >
            {loading
              ? "Fetching Latest Rates..."
              : `Convert ${from.toUpperCase()} → ${to.toUpperCase()}`}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-white/70 mt-6">
          ⚡ Powered by open.er-api.com | Built with ❤️ using React + Tailwind
        </p>
      </div>
    </div>
  );
}

export default App;
