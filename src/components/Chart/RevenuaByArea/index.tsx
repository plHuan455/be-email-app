import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps {
    data: string
}

const RevenuaByAreaChart: React.FC<ChartProps> = (props) => {



    const data = [
        {
            name: 'Q01',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Q02',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Q03',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Q04',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },

    ];

    const customProps = {
        displayKeys: { x: 'amount', y: 'time', value: '1' },
        width: 500,
        height: 400,
        data: data
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={customProps.data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                {customProps.displayKeys?.x && <XAxis dataKey={customProps.displayKeys.x} />}
                {customProps.displayKeys?.y && <YAxis dataKey={customProps.displayKeys.y} />}
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="amt" fill="#c95c0e" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default RevenuaByAreaChart;
