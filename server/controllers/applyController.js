import mongoose from 'mongoose';
import Application from '../models/applicationModel.js';


export const applyapplication= async(req,res,next)=>{
   const {name,phone,email,education,skill,experiance,coverLetter}=req.body;
   if(!name,!phone,!email,!education,!skill,!experiance,!coverLetter)
    {
        next("plzz filled all the fields");
    }
    try{
        const application=await Application.create({
            name,
            phone,
            email,
            education,
            skill,
            experiance,
            coverLetter,
        });
        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application: {
              _id: application._id,
              name: application.name,
              phone: application.phone,
              email: application.email,
              education: application.education,
              skill: application.skill,
              experiance: application.experiance,
              coverLetter: application.coverLetter,
              createdAt: application.createdAt,
            },
          });
      
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
      };
