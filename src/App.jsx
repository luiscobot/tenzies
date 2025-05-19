import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import Confetti from "./components/Confetti";
import Die from "./components/Die";
import Header from "./components/Header";

export default function App() {
  const [dice, setDice] = useState(() => rollDice());
  const newGameRef = useRef(null);

  const gameWon = dice.every(
    (die) => die.isHeld && die.value === dice[0].value,
  );

  function rollDice() {
    return Array.from({ length: 10 }, () => ({
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  function handleRoll() {
    if (gameWon) {
      setDice(rollDice());
      return;
    }

    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.ceil(Math.random() * 6) };
      });
    });
  }

  function handleHold(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  useEffect(() => {
    if (gameWon) {
      newGameRef.current.focus();
    }
  }, [gameWon]);

  return (
    <>
      <Header />

      <main className="w-5/6 md:w-2/4 p-6 rounded-2xl bg-[#f0f0e6]">
        <section className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div className="col-span-full flex flex-col gap-4">
            <h1 className="text-4xl text-center text-[#de0607]">Tenzies</h1>

            <p className="md:w-2/4 m-auto text-xl text-center">
              Pick a number, save matching dice after each roll, and be first to
              get all ten showing the same value.
            </p>
          </div>

          {dice.map((die) => (
            <Die
              key={die.id}
              id={die.id}
              value={die.value}
              isHeld={die.isHeld}
              handleHold={handleHold}
            />
          ))}

          <button
            ref={newGameRef}
            type="button"
            onClick={handleRoll}
            className="col-span-full md:col-span-3 md:col-start-2 p-4 rounded-2xl border-b-6 border-blue-700 text-2xl text-white bg-blue-500 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-4"
          >
            {gameWon ? "New Game" : "Roll"}
          </button>
        </section>
      </main>

      {gameWon && <Confetti />}
    </>
  );
}
