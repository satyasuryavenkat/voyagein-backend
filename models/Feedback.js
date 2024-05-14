import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    suggestion: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
