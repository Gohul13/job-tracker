import { deleteModel } from "mongoose";
import Application from "../models/Application.js";
import mongoose  from "mongoose";

const createApplication = async (req, res,next) => {
  try {
    const application = {
      ...req.body,
      user: req.user.userId,
    };

    const newApplication = await Application.create(application);

    res.status(201).json(newApplication);
  } catch (error) {
        next(error);
  }
};

const getApplications = async (req, res) => {
  try {
      const { search, status, jobType, sort, page = 1, limit = 10, } = req.query; 

      const pageNumber = Number(page);
      const limitNumber = Number(limit);
      const skip = (pageNumber - 1) * limitNumber;
      const total = await Application.countDocuments({user: req.user.userId,});
      const query = {
        user: req.user.userId,
      };
      if (status) {
        query.status = status;
      }
      if (jobType) {
        query.jobType = jobType;
      }
      if (search) {
        query.$or = [
          { companyName: { $regex: search, $options: "i" } },
          { jobTitle: { $regex: search, $options: "i" } },
        ];
      }   
      let applicationsQuery = Application.find(query);

      if (sort === "latest") {
        applicationsQuery = applicationsQuery.sort({ applicationDate: -1 });
      }

      if (sort === "oldest") {
        applicationsQuery = applicationsQuery.sort({ applicationDate: 1 });
      }

      applicationsQuery = applicationsQuery
        .skip(skip)
        .limit(limitNumber); 

      const applications = await applicationsQuery;
      res.status(200).json({
          applications,
          page: pageNumber,
          limit: limitNumber,
          total,
      });

  } catch (error) {
    res.status(500).json({
      message: "Failed to get applications",
      error: error.message,
    });
  }
}; 

const getApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOne({
      _id: id,
      user: req.user.userId,
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get application",
      error: error.message,
    });
  }
};

const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;  

    const updatedApplication = await Application.findOneAndUpdate(
      {
         _id : id,
         user : req.user.userId, 
      },
      updates, 
      { returnDocument: "after", runValidators: true, } 
    );   

    if (!updatedApplication) {
      return res.status(404).json({
        message: "Application not found",
      });
    }
    
    res.status(200).json(updatedApplication);
  } catch (error) {
        if (error.name === "ValidationError") {
        const errors = {};

        for (const field in error.errors) {
          errors[field] = error.errors[field].message;
        }

        return res.status(400).json({
          message: "Validation failed",
          errors,
        });
      }
    res.status(500).json({
      message: "Failed to update application",
      error: error.message,
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedApplication = await Application.findOneAndDelete({
      _id: id,
      user: req.user.userId,
    });

    if (!deletedApplication) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("DELETE APPLICATION ERROR:", error);

    res.status(500).json({
      message: "Failed to delete application",
      error: error.message,
    });
  }
};

const getApplicationStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.userId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const result = {
        total: 0,
        applied: 0,
        interview: 0,
        selected: 0,
        rejected: 0,
    };
    stats.forEach((item) => {
        if (item._id === "Applied") {
          result.applied = item.count;
        }
        if (item._id === "Interview") {
          result.interview = item.count;
        }

        if (item._id === "Selected") {
          result.selected = item.count;
        }

        if (item._id === "Rejected") {
          result.rejected = item.count;
        }
        result.total = result.applied + result.interview + result.selected + result.rejected;
    });
    res.status(200).json(result);
  } catch (error) {
      res.send(500).res.json({
          message : "Failed to get application statistics",
          error : error.message,
      });
  }
};

export { deleteApplication,updateApplication,getApplications,createApplication, getApplicationStats, getApplication };