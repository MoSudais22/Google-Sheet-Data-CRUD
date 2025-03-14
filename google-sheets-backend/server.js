const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const auth = new google.auth.GoogleAuth({
  keyFile: "model-charge-453707-b5-b7d129e5f095.json", // Ensure this file exists
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID = "1VGiA0lKXTSr48CJk-52wPOcmp1rttdVbbugEdK16_a0"; // Your actual Sheet ID
const SHEET_NAME = "Sheet1"; // Update if different

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Google Sheets API Backend is Running 🚀");
});

// ✅ Get All Data
app.get("/data", async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME,
    });
    res.json(response.data.values);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Add New Entry
app.post("/add", async (req, res) => {
  const { id, name, email, role, experience, hireDate, active } = req.body;
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: SHEET_NAME,
      valueInputOption: "USER_ENTERED",
      resource: { values: [[id, name, email, role, experience, hireDate, active]] },
    });
    res.json({ message: "Data added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete Entry (Ensure correct Sheet ID)
app.delete("/delete", async (req, res) => {
  const { row } = req.body;
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      resource: {
        requests: [
          {
            deleteDimension: {
              range: {
                sheetId: 0, // Replace with actual Sheet ID (from URL)
                dimension: "ROWS",
                startIndex: row - 1,
                endIndex: row,
              },
            },
          },
        ],
      },
    });
    res.json({ message: "Data deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
