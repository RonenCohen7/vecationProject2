import "./LikesChart.css"
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface Props {
    report: { destination: string; likesCount: number }[];
}

export function LikesChart({ report }: Props) {

    const data = {
        labels: report.map(r => r.destination), // ציר X
        datasets: [
            {
                label: "Likes",
                data: report.map(r => r.likesCount), // ציר Y
                backgroundColor: "rgba(75,192,192,0.6)"
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const
            },
            title: {
                display: true,
                text: "Vacation Likes Report"
            }
        }
    };

    return <Bar data={data} options={options} />;
}