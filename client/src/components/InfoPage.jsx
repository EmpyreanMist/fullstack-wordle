function InfoPage() {
  const infoList = [
    "Choose the word length from 3-10",
    "You will have 6 attempts to guess the correct word",
    "Wrong letters will be grey, correct letters in the wrong position will be yellow and correct letters in the correct possition will be green",
  ];

  return (
    <div className="info-section">
      <h2>Information:</h2>
      <ul>
        {infoList.map((info, index) => {
          return <li key={index}>{info}</li>;
        })}
      </ul>
    </div>
  );
}

export default InfoPage;
