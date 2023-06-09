import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import Carousel from "../Components/Carousel/Carousel.jsx";

// Styles
import './HomePage.css';
import '../Components/Count/Count.css';

//data
import data from "../Components/data/data.json";

// Components
import HeroCard from "../Components/HeroCard/HeroCard";
import ProfileCard from "../Components/ProfileCard/ProfileCard";
import Count from "../Components/Count/Count.jsx";

function HomePage() {
    const [loggedIn] = useOutletContext();

    //state
    const [heroList, setHeroList] = useState([]);
    const [usersList, setUsersList] = useState([]);

    // Effects
    useEffect(() => {

        fetch(`${import.meta.env.VITE_API_URL}users`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setUsersList(data);
            }, []);

        fetch(`${import.meta.env.VITE_API_URL}hero`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setHeroList(data);
            });
    }, []);

    return (
        <div className="page-container">
            <h1 className="brandname-tech">tech <span className="brandname-div">&#60;Div&#62;</span><span className="brandname-ersity">ersity</span></h1>
            <h3 className="tagline">Breaking Industry Barriers</h3>
            <div className="hero-section">
                <h2>Tech trailblazers</h2>
                <Carousel>
                {heroList.map((hero, key) => {
                    if(hero.featured)
                        return <HeroCard key={key} heroData={hero} />;
                })}

                </Carousel>
                {loggedIn&&
                <div className="home-hero-buttons">
                    <Link className="btn" to="/create-hero">Add a hero card</Link>
                    <Link className="btn" to="/hero">See all cards</Link>
                </div>}
            </div>

            <div className="stats-section">
                <div className="stats">
                    <h3>Did you know?</h3>
                    <p className="stat-number"/>
                        {data.counts.map(count => <Count key={count.id} data={count}/>)}
                    <p>Computing jobs in the world held by women</p>
                </div>
                <div className="stats">
                    <h3>The Slow Rise</h3>
                    <p className="stat-number"/>
                        {data.counts2.map(count => <Count key={count.id} data={count}/>)}
                    <p>Represents the global increase of female software engineers in the past 21 years</p>
                </div>
                <div className="stats">
                    <h3>Community Pillars</h3>
                    <div className="stat-number">
                        {data.counts3.map(count => <Count key={count.id} data={count}/>)}
                    </div>
                    <p>Women have been taught by She Codes since its inception</p>
                </div>
            </div>
            <div id="p1" className="profiles-shuffle-board">
                <h2>Today's tech trailblazers</h2>
                <p className="trailblazer-text">Inspire the next generation of tech trailblazers, <Link to="create-profile">create an account</Link>!</p>
                {usersList.map((users, key) => {
                    if(users.is_published)
                        return <ProfileCard key={key} usersData={users} />;
                    })}
            </div>
            <div className="redirect">
                <h2>Get started in your tech career!</h2>
                <Link className="btn" to="https://shecodes.com.au/">Visit the She Codes website</Link>
            </div>
        </div>
    );
};

export default HomePage;

// website with stats - https://www.baysidegroup.com.au/employers/women-in-ict-in-statistics-how-does-your-company-stack-up#:~:text=Only%2024%25%20of%20computing%20jobs,experience%20gender%20bias%20at%20work. 