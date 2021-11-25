import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: false,
    },
};

const labels = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saterday', 'sunday'];

// export

export function Chart() {
    const data = {
        labels,
        datasets: [
            {
                label: 'Popularity of last 7 days',
                data: Array.from({length: 7}, () => Math.floor(Math.random() * 7)),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    return <Line options={options} data={data} type="line" />;
}
