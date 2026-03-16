import { useEffect, useState } from "react";
import "./LikesReport.css";
import { LikeReportModel } from "../../../../Models/LikeReportModel";
import { useTitle } from "../../../Utils/UseTitle";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../Utils/Notify";
import { LikesChart } from "../LikesChart/LikesChart";

export function LikesReport() {

    useTitle("Report");

    const [report, setReport] = useState<LikeReportModel[]>([]);


    //export to csv  file
    const exportToCSV = () => {

        if (report.length === 0) {
            notify.error("No data to export");
            return;
        }

        const headers = ["Destination", "Likes"];

        const rows = report.map(r => [
            r.destination,
            r.likesCount
        ]);

        const csvContent =
            [headers, ...rows]
                .map(e => e.join(","))
                .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "vacation_likes_report.csv");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };




    useEffect(() => {
        vacationService.getLikesReportFeed()
            .then(setReport)
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="LikesReport">

            <h2>Vacation Likes Report</h2>
            <button className="exportBtn" onClick={exportToCSV}>
                Export to CSV
            </button>

            {/* TABLE */}
            <table>
                <thead>
                    <tr>
                        <th>Destination</th>
                        <th>Likes</th>
                    </tr>
                </thead>

                <tbody>
                    {report.map((r, index) => (
                        <tr key={index}>
                            <td>{r.destination}</td>
                            <td>{r.likesCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* CHART */}
            <h2>Likes Chart</h2>
            <LikesChart report={report} />

        </div>
    );
}