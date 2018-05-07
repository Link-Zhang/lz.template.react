import {Component} from 'react';
import * as d3 from 'd3';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = this.prepState(props);
        this.drawTimeline = this.drawTimeline.bind(this);
    }

    prepState({data = [], min = 100, max = 700}) {
        const times = d3.extent(data.map(event => event.Date));
        const range = [min, max];
        return {data, times, range};
    }

    drawTimeline() {
        let group;
        const {data, times, range} = this.state;
        const {target} = this.refs;
        const scale = d3.scaleLinear().domain(times).range(range);

        target.innerHTML = '';

        d3.select(target)
            .append('svg')
            .attr('height', 200)
            .attr('width', range[1] + 100);

        group = d3.select(target.children[0])
            .selectAll('g')
            .data(data)
            .enter()
            .append('g')
            .attr('transform', (d, i) => 'translate(' + scale(d.Date) + ', 0)');

        group.append('circle')
            .attr('cy', 160)
            .attr('r', 5)
            .style('fill', 'blue');

        group.append('text')
            .text(d => d.Date + " - " + d["Event Title"])
            .style('font-size', 10)
            .attr('y', 115)
            .attr('x', -95)
            .attr('transform', 'rotate(-45)');
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.prepState(nextProps));
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.data !== this.state.data;
    }

    componentDidMount() {
        this.drawTimeline();
    }

    componentDidUpdate() {
        this.drawTimeline();
    }

    render() {
        return (
            <div className="timeline">
                <h1>{this.props.name} Timeline</h1>
                <div ref="target"/>
            </div>
        );
    }
}

export default Timeline;
