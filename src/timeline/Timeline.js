import {Component} from 'react';
import * as d3 from 'd3';
import Canvas from './Canvas';
import TimelineDot from './TimelineDot';

class Timeline extends Component {
    constructor({data = []}) {
        const times = d3.extent(data.map(d => d.year));
        const range = [50, 750];
        super({data});
        this.scale = d3.scaleLinear().domain(times).range(range);
        this.state = {data, times, range};
    }

    render() {
        const {data} = this.state;
        const {scale} = this;
        return (
            <div className="timeline">
                <h1>{this.props.name} Timeline</h1>
                <Canvas>
                    {data.map((d, i) =>
                        <TimelineDot position={scale(d.year)} txt={`${d.year} - ${d.event}`}/>
                    )}
                </Canvas>
            </div>
        );
    }

}

export default Timeline;
