import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },

  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },

  location: {
    type: String,
    required: true,
    trim: true,
  },

  jobType: {
    type: String,
    required: true,
    trim: true,
  },

  applicationDate: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["Applied", "Interview", "Selected", "Rejected"],
    default: "Applied",
  },

  source: {
    type: String,
  },

  salary: {
    type: String,
  },

  jobUrl: {
    type: String,
    match: /^https?:\/\/.+/,
  },

  notes: {
    type: String,
  },
  },
  {
    timestamps: true,
  },
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;