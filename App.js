import React, {useState}  from 'react';
import logo from './logo.svg';
import './App.css';
import countries from 'world-countries'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

 let areaSorted = countries.sort((a, b) => b.area - a.area);

 let noAntartica = areaSorted.filter(areaSorted => areaSorted.name.common !== "Antarctica");

 // går igneom hela arrayen, om landet INTE är Antarctica så behåller vi den!!

 let slicedList = noAntartica.slice(5, 15);
 /// frösta 15 länderna keep, klipper två gånger, men får länderna emellan
 // klipper innan 1, innan 16

 let firstFive = noAntartica.slice(0,5);

// en bar måste ligga innanför en annan <div>
// för att man kan bara returnera en div, en diva ska vara inuti en annan div


/*
    ska ligga i CountryInfo = props =>
    sedan i return

    för att skriva ut extra fakta om fiva first countries

   {props.data.name.common} </span> {props.data.area} km <sup>2</sup>
  {detailed}

*/



/*
      <nav>
        <ul>

        <li>
         <Link to="/CountryList">CountryList</Link>
        </li>

        <li>
          <Link to=""/country/" + props.data.caa3"> "/country/" + props.data.caa3 </Link>
        </li>

        </ul>
      </nav>
*/


// props.data.area + "em"
const CountryInfo = props => {

        let ratio = props.data.area/ firstFive[0].area;
        let procent = ratio*100;
       // console.log(procent);

        let detailed = null;
        
        if (props.detailed){
          detailed = <div>

        Capital: {props.data.capital[0]} <br></br>

        Region: {props.data.region} <br></br>

        Bordering to: {props.data.borders.length} countries 
         </div>; 
        }

          let letters = props.data.caa3;

      return (

        <Link to={"/country/" + letters}>
        <div>
        <span className ="bold">

          {props.data.name.common} </span> {props.data.area} km <sup>2</sup>
          {detailed}

          <br></br>
          <div
          style={{
            width: procent + "%",
            height: "1em",
            display: "inline-block",
            backgroundColor: "DodgerBlue",
          }}/>

          </div>
          </Link>

        );
    };


// key hålla reda på när listan uppdateras
// key hjälper att hitta det element som läggs till eller dras ifrån

// kallar på funktionen Countryinfo som gör en massa saker, se ovan
//.map = i detta fall så appcliceras det som sker i funktionen från fuktions kallet på varje elemnt i arrayen och lägger de nya elementen i sinb nya array.
// map ´kan användas på många olika sätt, kort och gott map gör på att en handling sker på alla element i en array och lägger dem i en ny array

// {slicedList.map(C => ( <CountryInfo key={C.cca3} data={C} detailed = {false} />))}


function CountryDetails(props) {
  // 
  return(
    <div> {props.match.params.cca3}  </div>
  )

};


function CountryList() {
    const [searchString, setSearchString] = useState("");


function textBox(event){
    setSearchString(event.target.value);
}


        const match = country => {
          const lowerCaseWord = country.name.common.toLowerCase();
          const lovwerCaseSearchString = searchString.toLowerCase();

          return lowerCaseWord.indexOf(lovwerCaseSearchString) === 0;
        }

      const filteredCountries = noAntartica.filter(match);

       let FiveSearched = filteredCountries.slice(0,5);

      //console.log("hello world");
      //console.log(countries);
      //console.log(searchString);
      console.log(filteredCountries);
 
    return (
    <div className="App">
    <input type="text" placeholder="Type here..." onChange={textBox} />
     {firstFive.map(C => ( <CountryInfo key={C.cca3} data={C} detailed= {true} />))} 
    </div>
  );


};

function App(){
  return(
    <Router>
    <div>

     <Switch> 

        <Route path="/country/:cca3" component = {CountryDetails}/>

          <Route path="/">
           <CountryList />
          </Route>

       </Switch>

    </div>
    </Router>
  )

};



export default App;
