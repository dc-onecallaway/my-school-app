import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Bell,
  LogOut,
  CheckCircle,
  GraduationCap,
  Layers,
  Clock,
  BarChart2,
  Menu,
} from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") window.location.href = "/login";

  // --- GLOBAL STATE ---
  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- DATA STATE ---
  const [stats, setStats] = useState({});
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [classes, setClasses] = useState([]);
  const [results, setResults] = useState([]);
  const [notices, setNotices] = useState([]);
  const [tests, setTests] = useState([]);
  const [timetables, setTimetables] = useState([]);

  // --- BATCH MANAGER STATE ---
  const [activeBatch, setActiveBatch] = useState(null);
  const [batchSchedule, setBatchSchedule] = useState([]);
  const [batchStudents, setBatchStudents] = useState([]);

  // --- ATTENDANCE STATE ---
  const [attCards, setAttCards] = useState([]);
  const [attData, setAttData] = useState({ batch: "", date: "" });

  // --- REPORT MODAL STATE ---
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportData, setReportData] = useState({ present: [], absent: [] });

  // --- FORM DATA STATE ---
  const [regData, setRegData] = useState({});
  const [clsData, setClsData] = useState({
    day: "Monday",
    time: "",
    subject: "",
    teacher: "",
    batch: "",
  });
  const [testData, setTestData] = useState({
    batch: "",
    date: "",
    time: "",
    subject: "",
    topic: "",
  });
  const [resData, setResData] = useState({});
  const [annData, setAnnData] = useState({
    target: "ALL",
    title: "",
    message: "",
  });
  const [ttData, setTtData] = useState({});

  // --- STUDENT MODAL STATE ---
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentStats, setStudentStats] = useState({
    attendance: [],
    results: [],
  });
  const [modalTab, setModalTab] = useState("info");

  // --- PICKERS STATE ---
  const [calOpen, setCalOpen] = useState(null); // 'reg', 'att', 'test'
  const [calDate, setCalDate] = useState({
    m: new Date().getMonth(),
    y: new Date().getFullYear(),
  });
  const [timeOpen, setTimeOpen] = useState(null); // 'cls', 'test'
  const [tempTime, setTempTime] = useState({ h: 12, m: 0, ap: "AM" });

  // Constants
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - 5 + i
  );

  // --- INITIAL LOAD ---
  useEffect(() => {
    loadStats();
    // Default dates to today
    const t = new Date();
    const todayStr = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(t.getDate()).padStart(2, "0")}`;
    setAttData((prev) => ({ ...prev, date: todayStr }));
  }, []);

  useEffect(() => {
    // Close sidebar on mobile when section changes
    if (window.innerWidth < 992) setSidebarOpen(false);

    if (section === "students") fetchStudents();
    if (section === "batch-manager") loadBatches();
    if (section === "classes") fetchClasses();
    if (section === "results") fetchResults();
    if (section === "announcements") fetchNotices();
    if (section === "tests") fetchTests();
    if (section === "timetable") {
      loadBatches();
      fetchTimetables();
    }
  }, [section]);

  // --- API ACTIONS ---
  const loadStats = async () => {
    try {
      const res = await axios.get("/api/stats");
      setStats(res.data);
    } catch (e) {}
  };
  const fetchStudents = async () => {
    const res = await axios.get("/api/users");
    setStudents(res.data);
  };
  const loadBatches = async () => {
    const res = await axios.get("/api/batches-list");
    setBatches(res.data);
  };
  const fetchClasses = async () => {
    const res = await axios.get("/api/classes");
    setClasses(res.data);
  };
  const fetchResults = async () => {
    const res = await axios.get("/api/results-all");
    setResults(res.data);
  };
  const fetchNotices = async () => {
    const res = await axios.get("/api/announcements");
    setNotices(res.data);
  };
  const fetchTests = async () => {
    const res = await axios.get("/api/tests");
    setTests(res.data);
  };
  const fetchTimetables = async () => {
    setTimetables(batches);
  };

  // --- BATCH DETAIL ---
  const handleBatchClick = async (batchName) => {
    setActiveBatch(batchName);
    const sRes = await axios.get(`/api/classes?batch=${batchName}`);
    setBatchSchedule(sRes.data);
    const stRes = await axios.get(`/api/users?batch=${batchName}`);
    setBatchStudents(stRes.data);
  };

  // --- STUDENT MODAL ---
  const openStudentModal = async (studentId) => {
    try {
      const res = await axios.get(`/api/users/${studentId}`);
      setSelectedStudent(res.data);
      const attRes = await axios.get(`/api/attendance/${res.data.username}`);
      const resRes = await axios.get(`/api/results/${res.data.username}`);
      setStudentStats({ attendance: attRes.data, results: resRes.data });
      setModalTab("info");
      setStudentModalOpen(true);
    } catch (err) {
      alert("Error loading student data");
    }
  };

  const updateStudent = async () => {
    try {
      await axios.put(`/api/users/${selectedStudent._id}`, selectedStudent);
      alert("Student Updated Successfully");
      setStudentModalOpen(false);
      fetchStudents();
    } catch (err) {
      alert("Update failed");
    }
  };

  const deleteStudent = async () => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedStudent.name}? This cannot be undone.`
      )
    )
      return;
    try {
      await axios.delete(`/api/users/${selectedStudent._id}`);
      alert("Student Deleted Successfully");
      setStudentModalOpen(false);
      fetchStudents();
      loadStats();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const getAttPercentage = () => {
    if (!studentStats.attendance.length) return 0;
    const present = studentStats.attendance.filter(
      (r) => r.status === "Present"
    ).length;
    return Math.round((present / studentStats.attendance.length) * 100);
  };

  // --- ATTENDANCE: FETCH / MARK ---
  const fetchAttendanceClass = async () => {
    if (!attData.batch || !attData.date)
      return alert("Please select Batch and Date");
    setAttCards([]);
    try {
      const studentsRes = await axios.get(`/api/users?batch=${attData.batch}`);
      const studentsInBatch = studentsRes.data;
      if (studentsInBatch.length === 0)
        return alert("No students found in this batch.");

      try {
        const attRes = await axios.post("/api/attendance/fetch", {
          batch: attData.batch,
          date: attData.date,
        });
        const existingRecords = Array.isArray(attRes.data)
          ? attRes.data
          : attRes.data.records || [];

        const mergedData = studentsInBatch.map((stu) => {
          const record = existingRecords.find(
            (r) => r.studentId === stu.username
          );
          return {
            name: stu.name,
            username: stu.username,
            status: record ? record.status : "Present",
          };
        });
        setAttCards(mergedData);
      } catch (err) {
        const freshData = studentsInBatch.map((stu) => ({
          name: stu.name,
          username: stu.username,
          status: "Present",
        }));
        setAttCards(freshData);
      }
    } catch (err) {
      alert("Error fetching data.");
    }
  };

  const toggleAtt = (username) => {
    setAttCards((prev) =>
      prev.map((s) =>
        s.username === username
          ? { ...s, status: s.status === "Present" ? "Absent" : "Present" }
          : s
      )
    );
  };

  const saveAtt = async () => {
    const records = attCards.map((s) => ({
      studentId: s.username,
      status: s.status,
    }));
    await axios.post("/api/attendance", {
      date: attData.date,
      batch: attData.batch,
      records,
    });
    alert("Attendance Saved Successfully!");
  };

  // --- ATTENDANCE: VIEW REPORT (FIXED NAME MAPPING) ---
  const viewAttendanceReport = async () => {
    if (!attData.batch || !attData.date)
      return alert("Select Batch & Date first");

    try {
      // 1. Fetch Students to get Names
      const stuRes = await axios.get(`/api/users?batch=${attData.batch}`);
      const allStudentsInBatch = stuRes.data;
      if (allStudentsInBatch.length === 0)
        return alert("No students in batch.");

      // Create Map: username -> Name
      const nameMap = {};
      allStudentsInBatch.forEach((s) => {
        nameMap[s.username] = s.name;
      });

      // 2. Fetch Records
      const attRes = await axios.post("/api/attendance/fetch", {
        batch: attData.batch,
        date: attData.date,
      });
      const records = Array.isArray(attRes.data)
        ? attRes.data
        : attRes.data.records || [];

      if (records.length === 0)
        return alert("No attendance taken on this date.");

      const present = [];
      const absent = [];

      records.forEach((r) => {
        // Use Name from map, or fallback to ID
        const displayName = nameMap[r.studentId] || r.studentId;
        if (r.status === "Present") present.push(displayName);
        else absent.push(displayName);
      });

      setReportData({ present, absent });
      setReportModalOpen(true);
    } catch (err) {
      alert("Attendance not found for this date.");
    }
  };

  // --- TIME PICKER LOGIC ---
  const handleTimeClick = (field, value) => {
    setTempTime((prev) => ({ ...prev, [field]: value }));
  };
  const commitTime = (type) => {
    const formattedTime = `${tempTime.h}:${String(tempTime.m).padStart(
      2,
      "0"
    )} ${tempTime.ap}`;
    if (type === "cls")
      setClsData((prev) => ({ ...prev, time: formattedTime }));
    if (type === "test")
      setTestData((prev) => ({ ...prev, time: formattedTime }));
    setTimeOpen(null);
  };
  const openTimePicker = (type, e) => {
    e.stopPropagation();
    setTimeOpen(type);
    setTempTime({ h: 12, m: 0, ap: "AM" });
  };

  // --- RENDERERS ---
  const renderTimePicker = (type) => (
    <div
      className={`time-popup ${timeOpen === type ? "active" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="tp-grid">
        <div className="tp-col">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`tp-item ${tempTime.h === i + 1 ? "selected" : ""}`}
              onClick={() => handleTimeClick("h", i + 1)}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="tp-col">
          {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
            <div
              key={m}
              className={`tp-item ${tempTime.m === m ? "selected" : ""}`}
              onClick={() => handleTimeClick("m", m)}
            >
              {String(m).padStart(2, "0")}
            </div>
          ))}
        </div>
        <div className="tp-col">
          <div
            className={`tp-item ${tempTime.ap === "AM" ? "selected" : ""}`}
            onClick={() => handleTimeClick("ap", "AM")}
          >
            AM
          </div>
          <div
            className={`tp-item ${tempTime.ap === "PM" ? "selected" : ""}`}
            onClick={() => handleTimeClick("ap", "PM")}
          >
            PM
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary"
        style={{ width: "100%", marginTop: "10px" }}
        onClick={() => commitTime(type)}
      >
        Set Time
      </button>
    </div>
  );

  const renderCalendar = (type) => {
    const daysInMonth = new Date(calDate.y, calDate.m + 1, 0).getDate();
    const firstDay = new Date(calDate.y, calDate.m, 1).getDay();
    const days = [];
    for (let i = 0; i < firstDay; i++)
      days.push(<div key={`e-${i}`} className="cal-day empty"></div>);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <div
          key={i}
          className="cal-day"
          onClick={(e) => {
            e.stopPropagation();
            const dStr = `${calDate.y}-${String(calDate.m + 1).padStart(
              2,
              "0"
            )}-${String(i).padStart(2, "0")}`;
            if (type === "reg") setRegData({ ...regData, admissionDate: dStr });
            if (type === "att") setAttData({ ...attData, date: dStr });
            if (type === "test") setTestData({ ...testData, date: dStr });
            setCalOpen(null);
          }}
        >
          {i}
        </div>
      );
    }
    return (
      <div
        className={`calendar-popup ${calOpen === type ? "active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cal-header">
          <select
            className="cal-select"
            value={calDate.m}
            onChange={(e) =>
              setCalDate({ ...calDate, m: parseInt(e.target.value) })
            }
          >
            {months.map((m, i) => (
              <option key={i} value={i}>
                {m}
              </option>
            ))}
          </select>
          <select
            className="cal-select"
            value={calDate.y}
            onChange={(e) =>
              setCalDate({ ...calDate, y: parseInt(e.target.value) })
            }
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="cal-weekdays">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        <div className="cal-days">{days}</div>
      </div>
    );
  };

  // --- ACTIONS ---
  const postNotice = async () => {
    if (!annData.title || !annData.message) return alert("Fill all fields");
    await axios.post("/api/announcements", {
      ...annData,
      targetBatch: annData.target || "ALL",
    });
    alert("Notice Posted");
    setAnnData({ target: "ALL", title: "", message: "" });
    fetchNotices();
  };
  const deleteNotice = async (id) => {
    if (confirm("Delete Notice?")) {
      await axios.delete(`/api/announcements/${id}`);
      fetchNotices();
    }
  };
  const registerStudent = async () => {
    await axios.post("/api/create-user", { ...regData, role: "student" });
    alert("Registered");
    fetchStudents();
  };
  const scheduleClass = async () => {
    await axios.post("/api/classes", clsData);
    alert("Scheduled");
    fetchClasses();
  };
  const scheduleTest = async () => {
    await axios.post("/api/tests", testData);
    alert("Test Scheduled");
    fetchTests();
  };
  const deleteTest = async (id) => {
    await axios.delete(`/api/tests/${id}`);
    fetchTests();
  };
  const uploadResult = async () => {
    await axios.post("/api/add-result", resData);
    alert("Uploaded");
    fetchResults();
  };
  const deleteResult = async (id) => {
    await axios.delete(`/api/results/${id}`);
    fetchResults();
  };
  const updateTimetable = async () => {
    await axios.post("/api/timetable", ttData);
    alert("Updated");
  };

  return (
    <div
      className="dashboard-layout"
      onClick={() => {
        setCalOpen(null);
        setTimeOpen(null);
      }}
    >
      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <div className="brand">
          <GraduationCap
            size={24}
            color="#facc15"
            style={{ marginRight: "10px" }}
          />{" "}
          TUTORS HUB
        </div>
        <div className="menu-label">Main</div>
        <div
          className={`menu-item ${section === "dashboard" ? "active" : ""}`}
          onClick={() => setSection("dashboard")}
        >
          <LayoutDashboard size={18} style={{ marginRight: "10px" }} /> Overview
        </div>
        <div
          className={`menu-item ${section === "batch-manager" ? "active" : ""}`}
          onClick={() => setSection("batch-manager")}
        >
          <Layers size={18} style={{ marginRight: "10px" }} /> Batches
        </div>
        <div
          className={`menu-item ${section === "students" ? "active" : ""}`}
          onClick={() => setSection("students")}
        >
          <Users size={18} style={{ marginRight: "10px" }} /> Students
        </div>
        <div
          className={`menu-item ${section === "attendance" ? "active" : ""}`}
          onClick={() => setSection("attendance")}
        >
          <CheckCircle size={18} style={{ marginRight: "10px" }} /> Attendance
        </div>
        <div className="menu-label">Academic</div>
        <div
          className={`menu-item ${section === "classes" ? "active" : ""}`}
          onClick={() => setSection("classes")}
        >
          <Calendar size={18} style={{ marginRight: "10px" }} /> Schedule
        </div>
        <div
          className={`menu-item ${section === "tests" ? "active" : ""}`}
          onClick={() => setSection("tests")}
        >
          <FileText size={18} style={{ marginRight: "10px" }} /> Tests
        </div>
        <div
          className={`menu-item ${section === "results" ? "active" : ""}`}
          onClick={() => setSection("results")}
        >
          <BarChart2 size={18} style={{ marginRight: "10px" }} /> Results
        </div>
        <div
          className={`menu-item ${section === "announcements" ? "active" : ""}`}
          onClick={() => setSection("announcements")}
        >
          <Bell size={18} style={{ marginRight: "10px" }} /> Notices
        </div>
        <div
          className={`menu-item ${section === "timetable" ? "active" : ""}`}
          onClick={() => setSection("timetable")}
        >
          <Clock size={18} style={{ marginRight: "10px" }} /> Timetable
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
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          Logout
        </div>
      </div>

      {/* CONTENT */}
      <div className="main-content">
        <div className="header">
          <div className="header-left">
            {/* Mobile Toggle */}
            <Menu
              className="mobile-toggle"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            />
            <h2 id="page-title">{section.replace("-", " ").toUpperCase()}</h2>
          </div>
          <div className="header-right">
            <div className="header-capsule">
              <div className="user-profile">
                <div className="avatar">{user.name.charAt(0)}</div>
                <div className="user-info">
                  <span className="u-name">{user.name}</span>
                  <span className="u-role">ADMIN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* OVERVIEW */}
        {section === "dashboard" && (
          <div className="grid-3">
            <div className="card" onClick={() => setSection("students")}>
              <div className="stat-num">{stats.studentCount || 0}</div>
              <div className="stat-label">Students</div>
            </div>
            <div className="card" onClick={() => setSection("tests")}>
              <div className="stat-num">{stats.testCount || 0}</div>
              <div className="stat-label">Tests</div>
            </div>
            <div className="card" onClick={() => setSection("results")}>
              <div className="stat-num">{stats.resultCount || 0}</div>
              <div className="stat-label">Results</div>
            </div>
          </div>
        )}

        {/* ATTENDANCE SECTION */}
        {section === "attendance" && (
          <div className="card">
            <h3>Attendance Record</h3>
            <div className="grid-3" style={{ alignItems: "end" }}>
              <div className="date-picker-wrap" style={{ marginBottom: 0 }}>
                <div
                  className="date-display"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCalOpen("att");
                  }}
                >
                  <span>{attData.date || "Select Date"}</span>{" "}
                  <Calendar size={16} />
                </div>
                {renderCalendar("att")}
              </div>
              <input
                type="text"
                placeholder="Batch Name"
                style={{ marginBottom: 0 }}
                onChange={(e) =>
                  setAttData({ ...attData, batch: e.target.value })
                }
              />
              <div style={{ display: "flex", gap: "10px", height: "46px" }}>
                <button
                  className="btn btn-primary"
                  onClick={fetchAttendanceClass}
                >
                  Fetch / Mark
                </button>
                <button
                  className="btn btn-outline"
                  style={{ borderColor: "#4f46e5", color: "#4f46e5" }}
                  onClick={viewAttendanceReport}
                >
                  View Report
                </button>
              </div>
            </div>
            <div className="att-grid" style={{ marginTop: "30px" }}>
              {attCards.length > 0 ? (
                attCards.map((s) => (
                  <div
                    key={s.username}
                    className={`att-card ${
                      s.status === "Present" ? "present" : "absent"
                    }`}
                    onClick={() => toggleAtt(s.username)}
                  >
                    <div style={{ fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: "0.8rem" }}>{s.username}</div>
                    <div className="att-status-badge">
                      {s.status.toUpperCase()}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "gray", marginTop: "15px" }}>
                  Select Date & Batch to manage attendance.
                </p>
              )}
            </div>
            {attCards.length > 0 && (
              <button
                className="btn btn-primary"
                style={{ marginTop: "20px", width: "100%" }}
                onClick={saveAtt}
              >
                Save Attendance
              </button>
            )}
          </div>
        )}

        {/* SCHEDULE CLASS */}
        {section === "classes" && (
          <>
            <div className="card">
              <h3>Schedule Class</h3>
              <div className="grid-3">
                <input
                  type="text"
                  placeholder="Batch Name"
                  onChange={(e) =>
                    setClsData({ ...clsData, batch: e.target.value })
                  }
                />
                <div className="time-picker-wrapper">
                  <div
                    className="date-display"
                    onClick={(e) => openTimePicker("cls", e)}
                  >
                    <span>{clsData.time || "Select Time"}</span>{" "}
                    <Clock size={16} />
                  </div>
                  {renderTimePicker("cls")}
                </div>
              </div>
              <div className="day-selector">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((d) => (
                  <div
                    key={d}
                    className={`day-pill ${clsData.day === d ? "active" : ""}`}
                    onClick={() => setClsData({ ...clsData, day: d })}
                  >
                    {d.substr(0, 3)}
                  </div>
                ))}
              </div>
              <div className="grid-3">
                <input
                  type="text"
                  placeholder="Subject"
                  onChange={(e) =>
                    setClsData({ ...clsData, subject: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Teacher"
                  onChange={(e) =>
                    setClsData({ ...clsData, teacher: e.target.value })
                  }
                />
              </div>
              <button className="btn btn-primary" onClick={scheduleClass}>
                Add Class
              </button>
            </div>
            <div className="card" style={{ marginTop: "20px" }}>
              <h3>Schedule</h3>
              {classes.map((c) => (
                <div
                  key={c._id}
                  style={{
                    background: "#f8fafc",
                    padding: "12px",
                    border: "1px solid #e2e8f0",
                    marginBottom: "5px",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <b>{c.batch}</b> | {c.day} @ {c.time} - {c.subject}
                  </div>
                  <button
                    className="btn btn-danger"
                    style={{ padding: "4px 8px" }}
                    onClick={async () => {
                      await axios.delete(`/api/classes/${c._id}`);
                      fetchClasses();
                    }}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* BATCHES */}
        {section === "batch-manager" &&
          (!activeBatch ? (
            <div className="card">
              <h3>Active Batches</h3>
              <div className="batch-grid">
                {batches.map((b) => (
                  <div
                    key={b.name}
                    className="batch-card"
                    onClick={() => handleBatchClick(b.name)}
                  >
                    <div
                      style={{
                        fontWeight: "700",
                        margin: "10px 0",
                        fontSize: "1.2rem",
                      }}
                    >
                      {b.name}
                    </div>
                    <small>{b.count} Students</small>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card">
              <button
                className="btn btn-outline"
                onClick={() => setActiveBatch(null)}
                style={{ marginBottom: "20px" }}
              >
                &larr; Back
              </button>
              <h2 style={{ color: "var(--primary)" }}>{activeBatch}</h2>
              <h4>Schedule</h4>
              <div className="grid-3">
                {batchSchedule.map((s) => (
                  <div
                    key={s._id}
                    style={{
                      background: "#f8fafc",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <b>{s.day}</b> @ {s.time}
                    <br />
                    {s.subject} ({s.teacher})
                  </div>
                ))}
              </div>
              <h4 style={{ marginTop: "20px" }}>Students</h4>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batchStudents.map((s) => (
                      <tr key={s._id}>
                        <td>{s.name}</td>
                        <td>{s.phone}</td>
                        <td>
                          <button
                            className="btn btn-outline"
                            style={{ padding: "4px 8px" }}
                            onClick={() => openStudentModal(s._id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

        {/* STUDENTS */}
        {section === "students" && (
          <>
            <div className="card" style={{ marginBottom: "30px" }}>
              <h3>Register Student</h3>
              <div className="grid-3">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setRegData({ ...regData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Roll No</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setRegData({ ...regData, username: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setRegData({ ...regData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Password</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setRegData({ ...regData, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Batch</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setRegData({ ...regData, batch: e.target.value })
                    }
                  />
                </div>
                <div className="date-picker-wrap">
                  <label className="form-label">Admission Date</label>
                  <div
                    className="date-display"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCalOpen("reg");
                    }}
                  >
                    <span>{regData.admissionDate || "Select Date"}</span>{" "}
                    <Calendar size={16} />
                  </div>
                  {renderCalendar("reg")}
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setRegData({ ...regData, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Parent</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setRegData({ ...regData, parentName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">School</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setRegData({ ...regData, school: e.target.value })
                    }
                  />
                </div>
                <div style={{ gridColumn: "span 3" }}>
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setRegData({ ...regData, address: e.target.value })
                    }
                  />
                </div>
              </div>
              <button className="btn btn-primary" onClick={registerStudent}>
                Register Student
              </button>
            </div>
            <div className="card">
              <h3>Directory</h3>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Roll No</th>
                      <th>Batch</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s._id}>
                        <td>
                          <b>{s.name}</b>
                        </td>
                        <td>{s.username}</td>
                        <td>
                          <span
                            style={{
                              background: "#dcfce7",
                              padding: "4px 8px",
                              borderRadius: "12px",
                              color: "#166534",
                            }}
                          >
                            {s.batch}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-outline"
                            style={{ padding: "4px 10px" }}
                            onClick={() => openStudentModal(s._id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* NOTICES */}
        {section === "announcements" && (
          <div className="card">
            <h3>Post Notice</h3>
            <label className="form-label">Target Audience</label>
            <select
              style={{ marginBottom: "15px" }}
              onChange={(e) =>
                setAnnData({ ...annData, target: e.target.value })
              }
            >
              <option value="ALL">All Students</option>
              {batches.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) =>
                setAnnData({ ...annData, title: e.target.value })
              }
            />
            <textarea
              placeholder="Message"
              rows="3"
              onChange={(e) =>
                setAnnData({ ...annData, message: e.target.value })
              }
            ></textarea>
            <button className="btn btn-primary" onClick={postNotice}>
              Post Notice
            </button>
            <div className="table-responsive" style={{ marginTop: "20px" }}>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Target</th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map((n) => (
                    <tr key={n._id}>
                      <td>{new Date(n.date).toLocaleDateString()}</td>
                      <td>{n.targetBatch}</td>
                      <td>{n.title}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteNotice(n._id)}
                        >
                          Del
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TESTS & RESULTS & TIMETABLE */}
        {section === "tests" && (
          <div className="card">
            <h3>Schedule Test</h3>
            <div className="grid-3">
              <input
                type="text"
                placeholder="Batch"
                onChange={(e) =>
                  setTestData({ ...testData, batch: e.target.value })
                }
              />
              <div className="date-picker-wrap" style={{ marginBottom: 0 }}>
                <div
                  className="date-display"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCalOpen("test");
                  }}
                >
                  <span>{testData.date || "Select Date"}</span>{" "}
                  <Calendar size={16} />
                </div>
                {renderCalendar("test")}
              </div>
              <div className="time-picker-wrapper" style={{ marginBottom: 0 }}>
                <div
                  className="date-display"
                  onClick={(e) => openTimePicker("test", e)}
                >
                  <span>{testData.time || "Time"}</span> <Clock size={16} />
                </div>
                {renderTimePicker("test")}
              </div>
            </div>
            <div className="grid-3">
              <input
                type="text"
                placeholder="Subject"
                onChange={(e) =>
                  setTestData({ ...testData, subject: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Topic"
                style={{ gridColumn: "span 2" }}
                onChange={(e) =>
                  setTestData({ ...testData, topic: e.target.value })
                }
              />
            </div>
            <button className="btn btn-primary" onClick={scheduleTest}>
              Schedule
            </button>
            <div className="table-responsive" style={{ marginTop: "20px" }}>
              <table>
                <thead>
                  <tr>
                    <th>Batch</th>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((t) => (
                    <tr key={t._id}>
                      <td>{t.batch}</td>
                      <td>{t.date}</td>
                      <td>{t.subject}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTest(t._id)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {section === "results" && (
          <div className="card">
            <h3>Upload Marks</h3>
            <div className="grid-3">
              <input
                type="text"
                placeholder="Roll No"
                onChange={(e) =>
                  setResData({ ...resData, studentId: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Exam Type"
                onChange={(e) =>
                  setResData({ ...resData, examType: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Subject"
                onChange={(e) =>
                  setResData({ ...resData, subject: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Marks"
                onChange={(e) =>
                  setResData({ ...resData, marksObtained: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Total"
                onChange={(e) =>
                  setResData({ ...resData, totalMarks: e.target.value })
                }
              />
            </div>
            <button className="btn btn-primary" onClick={uploadResult}>
              Upload
            </button>
            <div className="table-responsive" style={{ marginTop: "20px" }}>
              <table>
                <thead>
                  <tr>
                    <th>Roll No</th>
                    <th>Exam</th>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r._id}>
                      <td>{r.studentId}</td>
                      <td>{r.examType}</td>
                      <td>{r.subject}</td>
                      <td>
                        {r.marksObtained}/{r.totalMarks}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteResult(r._id)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {section === "timetable" && (
          <>
            <div className="card">
              <h3>Update Timetable</h3>
              <label className="form-label">Batch</label>
              <input
                type="text"
                onChange={(e) =>
                  setTtData({ ...ttData, batch: e.target.value })
                }
              />
              <label className="form-label">Image URL</label>
              <input
                type="text"
                onChange={(e) =>
                  setTtData({ ...ttData, imageUrl: e.target.value })
                }
              />
              <label className="form-label">Notes</label>
              <textarea
                rows="3"
                onChange={(e) =>
                  setTtData({ ...ttData, notes: e.target.value })
                }
              />
              <button className="btn btn-primary" onClick={updateTimetable}>
                Update
              </button>
            </div>
            <div className="card" style={{ marginTop: "20px" }}>
              <h3>Current Timetables</h3>
              <div className="batch-grid">
                {timetables.map((t) => (
                  <div
                    key={t.name}
                    className="batch-card"
                    onClick={async () => {
                      const res = await axios.get(`/api/timetable/${t.name}`);
                      if (res.data.imageUrl)
                        window.open(res.data.imageUrl, "_blank");
                      else alert("No timetable");
                    }}
                  >
                    <div style={{ fontWeight: "700", fontSize: "1.1rem" }}>
                      {t.name}
                    </div>
                    <small style={{ color: "blue" }}>View</small>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* --- REPORT MODAL --- */}
      <div className={`modal-overlay ${reportModalOpen ? "active" : ""}`}>
        <div className="modal">
          <div className="modal-banner">
            <div
              className="close-modal"
              onClick={() => setReportModalOpen(false)}
            >
              &times;
            </div>
            <div className="modal-avatar-wrapper">
              <div className="modal-avatar">
                <FileText />
              </div>
            </div>
          </div>
          <div className="modal-body">
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Attendance Report ({attData.date})
            </h2>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ flex: 1, marginRight: "10px" }}>
                <h4
                  style={{
                    color: "#10b981",
                    borderBottom: "2px solid #10b981",
                    paddingBottom: "5px",
                  }}
                >
                  Present ({reportData.present.length})
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {reportData.present.map((n, i) => (
                    <li
                      key={i}
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #f1f5f9",
                        fontSize: "0.9rem",
                      }}
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ flex: 1, marginLeft: "10px" }}>
                <h4
                  style={{
                    color: "#ef4444",
                    borderBottom: "2px solid #ef4444",
                    paddingBottom: "5px",
                  }}
                >
                  Absent ({reportData.absent.length})
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                  {reportData.absent.map((n, i) => (
                    <li
                      key={i}
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #f1f5f9",
                        fontSize: "0.9rem",
                      }}
                    >
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- STUDENT MODAL --- */}
      <div className={`modal-overlay ${studentModalOpen ? "active" : ""}`}>
        <div className="modal">
          <div className="modal-banner">
            <div
              className="close-modal"
              onClick={() => setStudentModalOpen(false)}
            >
              &times;
            </div>
            <div className="modal-avatar-wrapper">
              <div className="modal-avatar">
                {selectedStudent?.name?.charAt(0)}
              </div>
            </div>
          </div>
          <div className="modal-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2 style={{ margin: 0 }}>{selectedStudent?.name}</h2>
                <span style={{ color: "gray" }}>
                  {selectedStudent?.username}
                </span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn btn-outline"
                  onClick={() => setModalTab("info")}
                  style={{
                    borderBottom:
                      modalTab === "info" ? "3px solid var(--primary)" : "none",
                  }}
                >
                  Info
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setModalTab("stats")}
                  style={{
                    borderBottom:
                      modalTab === "stats"
                        ? "3px solid var(--primary)"
                        : "none",
                  }}
                >
                  Stats
                </button>
              </div>
            </div>
            {modalTab === "info" && selectedStudent && (
              <div
                className="grid-3"
                style={{ gridTemplateColumns: "1fr 1fr" }}
              >
                <div>
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    value={selectedStudent.name}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    value={selectedStudent.email}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Batch</label>
                  <input
                    type="text"
                    value={selectedStudent.batch}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        batch: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    value={selectedStudent.phone}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">Parent</label>
                  <input
                    type="text"
                    value={selectedStudent.parentName}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        parentName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label">School</label>
                  <input
                    type="text"
                    value={selectedStudent.school}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        school: e.target.value,
                      })
                    }
                  />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    value={selectedStudent.address}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="form-label" style={{ color: "#ef4444" }}>
                    Password
                  </label>
                  <input
                    type="text"
                    value={selectedStudent.password}
                    onChange={(e) =>
                      setSelectedStudent({
                        ...selectedStudent,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div
                  style={{
                    gridColumn: "span 2",
                    marginTop: "10px",
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    onClick={updateStudent}
                  >
                    Save Changes
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                    onClick={deleteStudent}
                  >
                    Delete Student
                  </button>
                </div>
              </div>
            )}
            {modalTab === "stats" && (
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    background: "#f8fafc",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ width: "80px" }}>
                    <Doughnut
                      data={{
                        labels: ["P", "A"],
                        datasets: [
                          {
                            data: [
                              studentStats.attendance.filter(
                                (r) => r.status === "Present"
                              ).length,
                              studentStats.attendance.filter(
                                (r) => r.status !== "Present"
                              ).length,
                            ],
                            backgroundColor: ["#10b981", "#ef4444"],
                          },
                        ],
                      }}
                      options={{
                        plugins: { legend: { display: false } },
                        cutout: "70%",
                      }}
                    />
                  </div>
                  <div>
                    <h2 style={{ margin: 0, color: "var(--primary)" }}>
                      {getAttPercentage()}%
                    </h2>
                    <small>ATTENDANCE</small>
                  </div>
                </div>
                <div
                  className="table-responsive"
                  style={{ maxHeight: "200px" }}
                >
                  <table>
                    <thead>
                      <tr>
                        <th>Exam</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentStats.results.map((r) => (
                        <tr key={r._id}>
                          <td>
                            {r.examType} ({r.subject})
                          </td>
                          <td>
                            {r.marksObtained}/{r.totalMarks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
