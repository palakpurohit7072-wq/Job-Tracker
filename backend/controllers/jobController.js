import Job from "../models/Job.js";

// Get Logged-in User Jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Job
export const addJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Update Job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Allow only owner
    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Allow only owner
    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};