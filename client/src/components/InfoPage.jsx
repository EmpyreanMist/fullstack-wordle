import "../styles/infoPage.css";

function InfoPage() {
  const infoList = [
    "Choose the word length from 3-10",
    "You will have 6 attempts to guess the correct word",
    "Wrong letters will be grey",
    "Correct letters in the wrong position will be yellow",
    "Correct letters in the correct possition will be green",
  ];

  const aboutMe = [
    "This project was created by me, Christian, as part of my journey into web development",
    "I build the frontend using React and styled it with CSS modules",
    "The backend is created with express",
  ];

  return (
    <>
      <div className="info-section">
        <h2>About the game:</h2>
        <ul>
          {infoList.map((info, index) => {
            return <li key={index}>{info}</li>;
          })}
        </ul>
      </div>
      <div className="about-me">
        <h2>About me:</h2>
        <ul>
          {aboutMe.map((info, index) => {
            return <li key={index}>{info}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default InfoPage;
