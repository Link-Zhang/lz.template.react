import React from 'react';
import {ResponsiveContainer} from 'recharts';
import './index.css'

const ChartContainer = ({
                            children,
                            minHeight = 300,
                            maxHeight = 400,
                        }) => (
    <div className={"chartContainer"} style={{minHeight, maxHeight}}>
        <div className={"chartContainerContent"} style={{minHeight, maxHeight}}>
            <ResponsiveContainer>{children}</ResponsiveContainer>
        </div>
    </div>
);

export default ChartContainer;
