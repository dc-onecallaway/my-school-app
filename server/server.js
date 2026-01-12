const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Connection Error:", err));

// --- SCHEMAS ---
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true }, // Plain text now
  role: { type: String, enum: ["student", "admin"], default: "student" },
  name: String,
  batch: String,
  parentName: String,
  school: String,
  address: String,
  phone: String,
  admissionDate: String,
  joined: { type: Date, default: Date.now },
});
const User = mongoose.model("User", UserSchema);

// (Other schemas kept simple for brevity but they exist in your DB)
const Result = mongoose.model(
  "Result",
  new mongoose.Schema({
    studentId: String,
    subject: String,
    marksObtained: Number,
    totalMarks: Number,
    examType: String,
    date: { type: Date, default: Date.now },
  })
);
const Announcement = mongoose.model(
  "Announcement",
  new mongoose.Schema({
    title: String,
    message: String,
    targetBatch: String,
    date: { type: Date, default: Date.now },
  })
);
const Test = mongoose.model(
  "Test",
  new mongoose.Schema({
    batch: String,
    subject: String,
    topic: String,
    date: String,
    time: String,
  })
);
const Attendance = mongoose.model(
  "Attendance",
  new mongoose.Schema({
    date: String,
    batch: String,
    records: [{ studentId: String, status: String }],
  })
);
const Timetable = mongoose.model(
  "Timetable",
  new mongoose.Schema({ batch: String, imageUrl: String, notes: String })
);
const ClassSchedule = mongoose.model(
  "ClassSchedule",
  new mongoose.Schema({
    batch: String,
    day: String,
    time: String,
    subject: String,
    teacher: String,
  })
);
const Notification = mongoose.model(
  "Notification",
  new mongoose.Schema({
    target: String,
    message: String,
    type: String,
    date: { type: Date, default: Date.now },
  })
);

// --- API ROUTES ---

// 1. EMERGENCY ADMIN FIX (RUN THIS IN BROWSER: http://localhost:3000/fix-admin)
app.get("/fix-admin", async (req, res) => {
  try {
    // This will force the admin password to be 'admin123' in plain text
    const update = await User.findOneAndUpdate(
      { role: "admin" },
      { password: "admin123" }, // Set your desired password here
      { new: true }
    );
    if (update)
      res.send(
        `<h1>✅ Success!</h1><p>Admin password reset to: <b>admin123</b></p><a href="/index.html">Go to Login</a>`
      );
    else
      res.send(
        "<h1>❌ Error</h1><p>No Admin account found. Please create one manually in MongoDB.</p>"
      );
  } catch (e) {
    res.send(e.message);
  }
});

// 2. AUTH (Plain Text Check)
app.post("/api/login", async (req, res) => {
  const { identifier, password } = req.body;
  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });

  if (!user) return res.json({ success: false, message: "User not found" });

  // Direct check (since we removed hashing)
  if (user.password !== password)
    return res.json({ success: false, message: "Wrong password" });

  res.json({
    success: true,
    username: user.username,
    role: user.role,
    name: user.name,
    batch: user.batch,
  });
});

// 3. USER CREATION (Plain Text Save)
app.post("/api/create-user", async (req, res) => {
  const { username, email } = req.body;
  const uCheck = await User.findOne({ username });
  if (uCheck) return res.json({ success: false, message: "Roll No exists" });
  if (email) {
    const eCheck = await User.findOne({ email });
    if (eCheck) return res.json({ success: false, message: "Email exists" });
  }
  const newUser = new User(req.body); // Saves password as plain text
  await newUser.save();
  res.json({ success: true, message: "Registered" });
});

// 4. USER UPDATE
app.put("/api/users/:id", async (req, res) => {
  const updates = { ...req.body };
  if (!updates.password) delete updates.password; // Don't wipe password if not sent
  await User.findByIdAndUpdate(req.params.id, updates);
  res.json({ success: true, message: "Updated" });
});

// (Standard Getters - Kept same)
app.get("/api/users", async (req, res) => {
  const q = req.query.batch
    ? { role: "student", batch: req.query.batch }
    : { role: "student" };
  const s = await User.find(q);
  res.json(s);
});
app.get("/api/users/:id", async (req, res) => {
  const u = await User.findById(req.params.id);
  res.json(u);
});
app.delete("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await Result.deleteMany({ studentId: user.username });
    await Attendance.updateMany(
      {},
      { $pull: { records: { studentId: user.username } } }
    );
    await User.findByIdAndDelete(req.params.id);
  }
  res.json({ success: true });
});

// OTHER ROUTES (Batches, Attendance, etc.)
app.get("/api/batches-list", async (req, res) => {
  try {
    const batches = await User.distinct("batch", { role: "student" });
    const batchData = [];
    for (let b of batches) {
      if (b) {
        const count = await User.countDocuments({ role: "student", batch: b });
        batchData.push({ name: b, count });
      }
    }
    res.json(batchData);
  } catch (err) {
    res.status(500).json([]);
  }
});

app.post("/api/attendance/fetch", async (req, res) => {
  const { date, batch } = req.body;
  const students = await User.find({ role: "student", batch: batch }).select(
    "name username"
  );
  const existingRecord = await Attendance.findOne({ date, batch });
  let data = existingRecord
    ? students.map((s) => ({
        name: s.name,
        username: s.username,
        status:
          (existingRecord.records.find((r) => r.studentId === s.username) || {})
            .status || "Present",
      }))
    : students.map((s) => ({
        name: s.name,
        username: s.username,
        status: "Present",
      }));
  res.json(data);
});
app.post("/api/attendance", async (req, res) => {
  let a = await Attendance.findOne({
    date: req.body.date,
    batch: req.body.batch,
  });
  if (a) {
    a.records = req.body.records;
    await a.save();
  } else {
    await new Attendance(req.body).save();
  }
  res.json({ success: true });
});
app.get("/api/attendance/:studentId", async (req, res) => {
  const att = await Attendance.find({
    "records.studentId": req.params.studentId,
  });
  res.json(
    att.map((a) => ({
      date: a.date,
      status: a.records.find((r) => r.studentId === req.params.studentId)
        .status,
    }))
  );
});

app.post("/api/announcements", async (req, res) => {
  const a = new Announcement(req.body);
  await a.save();
  await new Notification({
    target: req.body.targetBatch,
    message: `📢 ${req.body.title}`,
    type: "info",
  }).save();
  res.json({ success: true });
});
app.get("/api/announcements", async (req, res) => {
  const q = req.query.batch
    ? { $or: [{ targetBatch: "ALL" }, { targetBatch: req.query.batch }] }
    : {};
  const a = await Announcement.find(q).sort({ date: -1 });
  res.json(a);
});
app.delete("/api/announcements/:id", async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.post("/api/classes", async (req, res) => {
  const c = new ClassSchedule(req.body);
  await c.save();
  await new Notification({
    target: req.body.batch,
    message: `🗓️ Class: ${req.body.subject}`,
    type: "success",
  }).save();
  res.json({ success: true });
});
app.get("/api/classes", async (req, res) => {
  const c = await ClassSchedule.find(
    req.query.batch ? { batch: req.query.batch } : {}
  );
  res.json(c);
});
app.delete("/api/classes/:id", async (req, res) => {
  await ClassSchedule.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.post("/api/tests", async (req, res) => {
  const t = new Test(req.body);
  await t.save();
  res.json({ success: true });
});
app.get("/api/tests", async (req, res) => {
  const t = await Test.find(req.query.batch ? { batch: req.query.batch } : {});
  res.json(t);
});
app.delete("/api/tests/:id", async (req, res) => {
  await Test.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.post("/api/add-result", async (req, res) => {
  const r = new Result(req.body);
  await r.save();
  res.json({ success: true });
});
app.get("/api/results-all", async (req, res) => {
  const r = await Result.find().sort({ date: -1 });
  res.json(r);
});
app.get("/api/results/:id/single", async (req, res) => {
  const r = await Result.findById(req.params.id);
  res.json(r);
});
app.put("/api/results/:id", async (req, res) => {
  await Result.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});
app.delete("/api/results/:id", async (req, res) => {
  await Result.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
app.get("/api/results/:studentId", async (req, res) => {
  const r = await Result.find({ studentId: req.params.studentId });
  res.json(r);
});

app.post("/api/timetable", async (req, res) => {
  let t = await Timetable.findOne({ batch: req.body.batch });
  if (t) {
    t.imageUrl = req.body.imageUrl;
    t.notes = req.body.notes;
    await t.save();
  } else {
    await new Timetable(req.body).save();
  }
  res.json({ success: true });
});
app.get("/api/timetable/:batch", async (req, res) => {
  const t = await Timetable.findOne({ batch: req.params.batch });
  res.json(t || {});
});

app.get("/api/notifications", async (req, res) => {
  const notifs = await Notification.find({
    $or: [
      { target: "ALL" },
      { target: req.query.batch },
      { target: req.query.username },
    ],
  })
    .sort({ date: -1 })
    .limit(10);
  res.json(notifs);
});
app.get("/api/stats", async (req, res) => {
  const s = await User.countDocuments({ role: "student" });
  const r = await Result.countDocuments();
  const t = await Test.countDocuments();
  res.json({ studentCount: s, resultCount: r, testCount: t });
});

app.listen(3000, () =>
  console.log("🚀 Server running at http://localhost:3000")
);
