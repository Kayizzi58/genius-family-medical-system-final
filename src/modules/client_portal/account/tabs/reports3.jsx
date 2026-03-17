import { h } from "preact";
import { useState, useMemo } from "preact/hooks";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const initialEmployees = [
  {
    id: 1,
    empNo: "DOC-001",
    name: "Dr. John Smith",
    role: "Doctor",
    department: "OPD",
    appointments: 120,
    revenue: 15000,
    attendance: 98,
    status: "Active"
  },
  {
    id: 2,
    empNo: "NUR-002",
    name: "Nurse Anna",
    role: "Nurse",
    department: "IPD",
    appointments: 85,
    revenue: 0,
    attendance: 95,
    status: "Active"
  }
];

const statusColor = {
  Active: "green",
  "On Leave": "yellow",
  Suspended: "red"
};

export default function EmployeeReports() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [search, setSearch] = useState("");

  // Performance Score Formula
  const calculatePerformance = (emp) => {
    const attendanceScore = emp.attendance;
    const workloadScore = emp.appointments > 0 ? 100 : 80;
    return Math.round((attendanceScore + workloadScore) / 2);
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [employees, search]);

  const totalRevenue = filteredEmployees.reduce((sum, emp) => sum + emp.revenue, 0);
  const avgAttendance =
    filteredEmployees.reduce((sum, emp) => sum + emp.attendance, 0) /
    filteredEmployees.length || 0;

  // ================= PDF EXPORT =================
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Monthly Employee Report - ${month}/${year}`, 14, 15);

    const tableColumn = [
      "Emp No",
      "Name",
      "Role",
      "Dept",
      "Appointments",
      "Revenue",
      "Attendance %",
      "Performance %"
    ];

    const tableRows = filteredEmployees.map(emp => [
      emp.empNo,
      emp.name,
      emp.role,
      emp.department,
      emp.appointments,
      `$${emp.revenue}`,
      `${emp.attendance}%`,
      `${calculatePerformance(emp)}%`
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save(`Employee_Report_${month}_${year}.pdf`);
  };

  // ================= EXCEL EXPORT =================
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredEmployees.map(emp => ({
        EmployeeNo: emp.empNo,
        Name: emp.name,
        Role: emp.role,
        Department: emp.department,
        Appointments: emp.appointments,
        Revenue: emp.revenue,
        Attendance: emp.attendance,
        Performance: calculatePerformance(emp)
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });

    saveAs(data, `Employee_Report_${month}_${year}.xlsx`);
  };

  return (
    <div className="ui container my-4">
      <div className="card p-4 shadow">
        <h2 className="ui teal header">
          <i className="chart line icon"></i>
          Monthly Employee Performance Report
        </h2>

        {/* Month Selector */}
        <div className="ui grid mb-3">
          <div className="four wide column">
            <input
              type="month"
              className="ui fluid input"
              onChange={(e) => {
                const [y, m] = e.target.value.split("-");
                setYear(y);
                setMonth(m);
              }}
            />
          </div>

          <div className="four wide column">
            <input
              className="ui fluid input"
              placeholder="Search employee..."
              onInput={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="four wide column">
            <button className="ui blue fluid button" onClick={exportPDF}>
              <i className="file pdf icon"></i> Export PDF
            </button>
          </div>

          <div className="four wide column">
            <button className="ui green fluid button" onClick={exportExcel}>
              <i className="file excel icon"></i> Export Excel
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="ui three stackable cards">
          <div className="ui card">
            <div className="content">
              <div className="header">Total Employees</div>
              <div className="description">{filteredEmployees.length}</div>
            </div>
          </div>

          <div className="ui card">
            <div className="content">
              <div className="header">Total Revenue</div>
              <div className="description">${totalRevenue}</div>
            </div>
          </div>

          <div className="ui card">
            <div className="content">
              <div className="header">Average Attendance</div>
              <div className="description">{avgAttendance.toFixed(1)}%</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <table className="ui celled striped selectable table mt-4">
          <thead>
            <tr>
              <th>Emp No</th>
              <th>Name</th>
              <th>Role</th>
              <th>Dept</th>
              <th>Appointments</th>
              <th>Revenue</th>
              <th>Attendance</th>
              <th>Performance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.empNo}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.department}</td>
                <td>{emp.appointments}</td>
                <td>${emp.revenue}</td>
                <td>{emp.attendance}%</td>
                <td>{calculatePerformance(emp)}%</td>
                <td>
                  <div className={`ui ${statusColor[emp.status]} label`}>
                    {emp.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}