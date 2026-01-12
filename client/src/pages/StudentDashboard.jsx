import { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Calendar,
  CheckCircle,
  BarChart2,
  LogOut,
  FileText,
  Bell,
  GraduationCap,
  Clock,
  Users,
  Menu,
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "student") window.location.href = "/login";

  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    attendance: [],
    classes: [],
    tests: [],
    results: [],
    notices: [],
    timetable: {},
  });

  useEffect(() => {
    // Close sidebar when screen resizes to desktop
    const handleResize = () => {
      if (window.innerWidth > 992) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    fetchData();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
    try {
      const [attRes, clsRes, tstRes, resRes, annRes, ttRes] = await Promise.all(
        [
          axios.get(`/api/attendance/${user.username}`),
          axios.get(`/api/classes?batch=${user.batch}`),
          axios.get(`/api/tests?batch=${user.batch}`),
          axios.get(`/api/results/${user.username}`),
          axios.get(`/api/announcements?batch=${user.batch}`),
          axios.get(`/api/timetable/${user.batch}`),
        ]
      );

      setData({
        attendance: attRes.data,
        classes: clsRes.data,
        tests: tstRes.data,
        results: resRes.data,
        notices: annRes.data,
        timetable: ttRes.data || {},
      });
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // --- CALCULATE STATS ---
  const presentCount = data.attendance.filter(
    (r) => r.status === "Present"
  ).length;
  const absentCount = data.attendance.filter(
    (r) => r.status !== "Present"
  ).length;
  const totalAtt = presentCount + absentCount;
  const attPct = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 0;

  // --- CHART CONFIG ---
  const chartDataAtt = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [presentCount, absentCount],
        backgroundColor: ["#10b981", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptionsAtt = {
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true, padding: 15 },
      },
    },
  };

  const chartDataPerf = {
    labels: data.results.map((r) => r.subject),
    datasets: [
      {
        label: "Score %",
        data: data.results.map((r) => (r.marksObtained / r.totalMarks) * 100),
        backgroundColor: "#4f46e5",
        borderRadius: 6,
        barThickness: 30,
        maxBarThickness: 50,
      },
    ],
  };

  const chartOptionsPerf = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, max: 100, grid: { color: "#f3f4f6" } },
      x: { grid: { display: false } },
    },
    plugins: { legend: { display: false } },
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 text-indigo-600 font-bold">
        Loading Student Portal...
      </div>
    );

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="brand">
          <GraduationCap
            size={28}
            color="#facc15"
            style={{ marginRight: "10px" }}
          />{" "}
          TUTORS HUB
        </div>

        <div className="menu-label">Main Menu</div>
        <div
          className={`menu-item ${
            activeSection === "dashboard" ? "active" : ""
          }`}
          onClick={() => {
            setActiveSection("dashboard");
            setSidebarOpen(false);
          }}
        >
          <LayoutDashboard size={18} style={{ marginRight: "10px" }} />{" "}
          Dashboard
        </div>
        <div
          className={`menu-item ${activeSection === "classes" ? "active" : ""}`}
          onClick={() => {
            setActiveSection("classes");
            setSidebarOpen(false);
          }}
        >
          <Calendar size={18} style={{ marginRight: "10px" }} /> Schedule
        </div>
        <div
          className={`menu-item ${
            activeSection === "attendance" ? "active" : ""
          }`}
          onClick={() => {
            setActiveSection("attendance");
            setSidebarOpen(false);
          }}
        >
          <CheckCircle size={18} style={{ marginRight: "10px" }} /> Attendance
        </div>
        <div
          className={`menu-item ${activeSection === "results" ? "active" : ""}`}
          onClick={() => {
            setActiveSection("results");
            setSidebarOpen(false);
          }}
        >
          <BarChart2 size={18} style={{ marginRight: "10px" }} /> Results
        </div>

        <div
          className="logout"
          style={{
            marginTop: "auto",
            padding: "12px",
            cursor: "pointer",
            color: "#ef4444",
            fontWeight: "600",
          }}
          onClick={logout}
        >
          <LogOut size={18} style={{ marginRight: "10px" }} /> Logout
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="header">
          <div className="header-left">
            <Menu
              className="mobile-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            />
            <h2 id="page-title">{activeSection.toUpperCase()}</h2>
          </div>
          <div className="header-right">
            <div className="header-capsule">
              <div className="user-profile">
                <div className="avatar">{user.name.charAt(0)}</div>
                <div className="user-info">
                  <span className="u-name">{user.name}</span>
                  <span className="u-role">Student • {user.batch}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- DASHBOARD HOME --- */}
        {activeSection === "dashboard" && (
          <div
            className="grid-3"
            style={{
              gridTemplateColumns: window.innerWidth > 992 ? "2fr 1fr" : "1fr",
            }}
          >
            {/* Notices */}
            <div
              className="card"
              style={{
                gridColumn: window.innerWidth > 992 ? "span 2" : "span 1",
              }}
            >
              <h3 className="mb-4 flex items-center gap-2">
                <Bell size={20} className="text-indigo-600" /> Latest Notices
              </h3>
              {data.notices.length === 0 ? (
                <p className="text-gray-500">No new notices.</p>
              ) : (
                <div className="space-y-4">
                  {data.notices.map((n) => (
                    <div
                      key={n._id}
                      style={{
                        padding: "15px",
                        background: "#f8fafc",
                        borderLeft: "4px solid #4f46e5",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: "10px",
                          marginBottom: "8px",
                        }}
                      >
                        <div style={{ fontWeight: "700", color: "#1e293b" }}>
                          {n.title}
                        </div>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            background: "#e0e7ff",
                            color: "#3730a3",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {new Date(n.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#475569",
                          lineHeight: "1.5",
                        }}
                      >
                        {n.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Tests */}
            <div className="card">
              <h3 className="mb-4 flex items-center gap-2">
                <FileText size={20} className="text-orange-500" /> Upcoming
                Tests
              </h3>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Subject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.tests.length > 0 ? (
                      data.tests.map((t) => (
                        <tr key={t._id}>
                          <td style={{ fontSize: "0.9rem" }}>
                            {new Date(t.date).toLocaleDateString()}
                          </td>
                          <td>
                            <div
                              style={{ fontWeight: "700", color: "#1f2937" }}
                            >
                              {t.subject}
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "gray" }}>
                              {t.topic}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="2"
                          style={{
                            textAlign: "center",
                            color: "gray",
                            padding: "20px",
                          }}
                        >
                          No upcoming tests
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- SCHEDULE (IMPROVED STYLING) --- */}
        {activeSection === "classes" && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="mb-4 flex items-center gap-2">
                <Clock size={20} /> Weekly Schedule
              </h3>
              <div
                className="grid-3"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                }}
              >
                {data.classes.map((c) => (
                  <div
                    key={c._id}
                    style={{
                      background: "white",
                      borderRadius: "16px",
                      border: "1px solid #e2e8f0",
                      overflow: "hidden",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                      transition: "transform 0.2s",
                      position: "relative",
                    }}
                    className="hover:scale-[1.02]"
                  >
                    <div
                      style={{
                        background: "#4f46e5",
                        height: "6px",
                        width: "100%",
                      }}
                    ></div>
                    <div style={{ padding: "20px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "15px",
                        }}
                      >
                        <span
                          style={{
                            background: "#eef2ff",
                            color: "#4338ca",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "0.75rem",
                            fontWeight: "800",
                            textTransform: "uppercase",
                          }}
                        >
                          {c.day}
                        </span>
                        <span
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: "700",
                            color: "#1f2937",
                          }}
                        >
                          {c.time}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "800",
                          color: "#111827",
                          marginBottom: "5px",
                        }}
                      >
                        {c.subject}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "#6b7280",
                          fontSize: "0.9rem",
                        }}
                      >
                        <Users size={16} /> {c.teacher}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {data.classes.length === 0 && (
                <p
                  style={{
                    color: "gray",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No classes scheduled for your batch.
                </p>
              )}
            </div>

            <div className="card">
              <h3 className="mb-4">Official Timetable</h3>
              {data.timetable.imageUrl ? (
                <div
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: "#f8fafc",
                    padding: "10px",
                  }}
                >
                  <img
                    src={data.timetable.imageUrl}
                    alt="Timetable"
                    style={{
                      width: "100%",
                      maxHeight: "500px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              ) : (
                <p style={{ color: "gray", fontStyle: "italic" }}>
                  No timetable uploaded.
                </p>
              )}
              {data.timetable.notes && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    background: "#fffbeb",
                    color: "#92400e",
                    borderRadius: "8px",
                    border: "1px solid #fcd34d",
                    fontSize: "0.95rem",
                  }}
                >
                  📌 <strong>Note:</strong> {data.timetable.notes}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- ATTENDANCE --- */}
        {activeSection === "attendance" && (
          <div
            className="grid-3"
            style={{
              gridTemplateColumns: window.innerWidth > 992 ? "1fr 2fr" : "1fr",
            }}
          >
            {/* Chart Card */}
            <div
              className="card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
              }}
            >
              <div
                style={{
                  width: "180px",
                  height: "180px",
                  position: "relative",
                  marginBottom: "20px",
                }}
              >
                <Doughnut data={chartDataAtt} options={chartOptionsAtt} />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    marginTop: "-10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: "800",
                      color: "#4f46e5",
                    }}
                  >
                    {attPct}%
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                <div style={{ color: "#10b981" }}>
                  ● Present: {presentCount}
                </div>
                <div style={{ color: "#ef4444" }}>● Absent: {absentCount}</div>
              </div>
            </div>

            {/* History Card */}
            <div className="card">
              <h3 className="mb-4">Attendance History</h3>
              <div
                className="table-responsive"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th style={{ textAlign: "right" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.attendance.length > 0 ? (
                      data.attendance.map((r, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: "500" }}>
                            {new Date(r.date).toLocaleDateString()}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <span
                              style={{
                                padding: "4px 12px",
                                borderRadius: "50px",
                                fontSize: "0.75rem",
                                fontWeight: "800",
                                background:
                                  r.status === "Present"
                                    ? "#dcfce7"
                                    : "#fee2e2",
                                color:
                                  r.status === "Present"
                                    ? "#166534"
                                    : "#991b1b",
                                display: "inline-block",
                                minWidth: "80px",
                                textAlign: "center",
                              }}
                            >
                              {r.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="2"
                          style={{
                            textAlign: "center",
                            padding: "20px",
                            color: "gray",
                          }}
                        >
                          No records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- RESULTS --- */}
        {activeSection === "results" && (
          <div className="card">
            <h3 style={{ marginBottom: "20px" }}>Performance Analysis</h3>

            {/* Bar Chart Container - Responsive Height */}
            <div
              style={{
                height: window.innerWidth < 768 ? "250px" : "350px",
                width: "100%",
                marginBottom: "40px",
              }}
            >
              <Bar data={chartDataPerf} options={chartOptionsPerf} />
            </div>

            {/* Detailed Table */}
            <div className="table-responsive">
              <table style={{ minWidth: "600px" }}>
                {" "}
                {/* Ensure table scrolls on mobile */}
                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {data.results.map((r) => {
                    const percentage = r.marksObtained / r.totalMarks;
                    const isPass = percentage >= 0.33;
                    return (
                      <tr key={r._id}>
                        <td style={{ fontWeight: "600" }}>{r.examType}</td>
                        <td>{r.subject}</td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: "80px",
                                height: "6px",
                                background: "#e2e8f0",
                                borderRadius: "4px",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${percentage * 100}%`,
                                  height: "100%",
                                  background: isPass ? "#4f46e5" : "#ef4444",
                                }}
                              ></div>
                            </div>
                            <span
                              style={{ fontWeight: "700", fontSize: "0.9rem" }}
                            >
                              {r.marksObtained}
                            </span>{" "}
                            <span
                              style={{ fontSize: "0.75rem", color: "gray" }}
                            >
                              / {r.totalMarks}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span
                            style={{
                              padding: "4px 10px",
                              borderRadius: "50px",
                              fontSize: "0.7rem",
                              fontWeight: "800",
                              background: isPass ? "#dcfce7" : "#fee2e2",
                              color: isPass ? "#166534" : "#991b1b",
                            }}
                          >
                            {isPass ? "PASS" : "FAIL"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {data.results.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          padding: "20px",
                          color: "gray",
                        }}
                      >
                        No results available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
