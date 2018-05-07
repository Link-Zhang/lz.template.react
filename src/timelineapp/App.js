import {Component} from 'react';
import Timeline from './Timeline';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showing: 'alex',
            timelines: {
                alex: [
                    {
                        "Date": 1977,
                        "Event Title": "Born",
                        "Event Description": "Born March 28 1977"
                    },
                    {
                        "Date": 1980,
                        "Event Title": "Started Sking",
                        "Event Description": "Starting skiing at Ski Liberty"
                    },
                    {
                        "Date": 1995,
                        "Event Title": "Yorktown Graduation",
                        "Event Description": "Graduated from Yorktown High School"
                    },
                    {
                        "Date": 1997,
                        "Event Title": "Georgetown",
                        "Event Description": "Transferred to Georgetown University"
                    },
                    {
                        "Date": 2002,
                        "Event Title": "Chicago",
                        "Event Description": "Moved To Chicago"
                    },
                    {
                        "Date": 2007,
                        "Event Title": "Met Eve",
                        "Event Description": "Met future wife Eve Porcello"
                    },
                    {
                        "Date": 2010,
                        "Event Title": "Seattle",
                        "Event Description": "Moved to Seattle with Eve"
                    },
                    {
                        "Date": 2011,
                        "Event Title": "Sonoma",
                        "Event Description": "Moved to Sonoma CA with Eve"
                    },
                    {
                        "Date": 2012,
                        "Event Title": "Tahoe",
                        "Event Description": "Moved to Tahoe Eve"
                    },
                    {
                        "Date": 2016,
                        "Event Title": "Published first book",
                        "Event Description": "Published Learning React with Eve Porcello"
                    }
                ],
                skiing: [
                    {
                        "Date": 1879,
                        "Event Title": "Ski Manufacturing Begins",
                        "Event Description": "Started by Norwegian immigrant in Minnesota"
                    },
                    {
                        "Date": 1882,
                        "Event Title": "US Ski Club Founded",
                        "Event Description": "Started in Berlin, New Hampshire and is still active"
                    },
                    {
                        "Date": 1924,
                        "Event Title": "First Winter Olympics Held",
                        "Event Description": "Nordic ski events only"
                    },
                    {
                        "Date": 1926,
                        "Event Title": "First US Ski Shop Opens",
                        "Event Description": "Founded by Oscar Hambro from Norway"
                    },
                    {
                        "Date": 1932,
                        "Event Title": "North Americas First Rope Tow Spins",
                        "Event Description": "Built in Shawbridge, Quebec"
                    },
                    {
                        "Date": 1936,
                        "Event Title": "First Chairlift Spins",
                        "Event Description": "Built in Sun Valley, ID"
                    },
                    {
                        "Date": 1949,
                        "Event Title": "Squaw Valley, Mad River Glen Open",
                        "Event Description": "Rippers gonna rip"
                    },
                    {
                        "Date": 1958,
                        "Event Title": "First Gondola Spins",
                        "Event Description": "Built in New Hampshire"
                    },
                    {
                        "Date": 1964,
                        "Event Title": "Plastic Buckle Boots Available",
                        "Event Description": "Life is better"
                    }
                ]
            }
        };
    }

    render() {
        const {timelines, showing} = this.state;
        return (
            <div className="app">
                <Timeline data={timelines[showing]} name={showing}/>
                <div>
                    <button onClick={() => this.setState({showing: 'alex'})}>Alex</button>
                    <button onClick={() => this.setState({showing: 'skiing'})}>Skiing</button>
                </div>
            </div>
        );
    }
}

export default App;
