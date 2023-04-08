import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"

// Styles

// Components
import HeroCard from "./Components/HeroCard/HeroCard";

// Shuffle hero cards
Array.prototype.shuffle = function () {
    let input = this;
  
    for (let i = input.length - 1; i >= 0; i--) {
  
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let itemAtIndex = input[randomIndex];
  
      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
    }
    return input;
  }
  
  let tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  tempArray.shuffle();
  
  // and the result is...
  alert(tempArray);


  
// remove a few from the list

function getRandomIndex(items) {
    return Math.floor(Math.random() * items.length);
  }
  
  for (var i = 0; i < 3; i++) {
    var removedItem = heroList.splice(getRandomIndex(myShows), 1);
    document.writeln(removedItem)
  }



//   HeroShuffle function

function HeroShuffle() {
    //state
    const [heroList, setHeroList] = useState([]);

    // Effects
    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}hero`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setHeroList(data);
            });
    }, []);

    return (
        <div className="hero-section">
            <h2>Tech trailblazers</h2>
            {heroList.map((hero, key) => {
                return <HeroCard key={key} heroData={hero} />;
            })}
        </div>
    );
};

export default HeroShuffle;