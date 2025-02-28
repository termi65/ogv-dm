import React from "react";


const Home = () => {

  return (
    <div className="p-4">
      <h1 className="text-info bg-dark p-2 text-center">Easy Drink v1.0</h1>
      <p className="mx-4">
        Hier kannst du für alle den Verzehr eintragen, wer wie viel getrunken hat und die Summe einsehen. 
        <br />Achtung beim Bezahlen, werden alle Eintragungen <b>gelöscht</b>! Es kann nicht nachvollzogen werden, was die Person getrunken hat!
      </p>
    </div>
  );
}

export default Home;