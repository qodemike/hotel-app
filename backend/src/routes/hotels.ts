import { BookingType } from "../../entities";
import verifyToken from "../middleware/auth";
import express, { Request, Response } from "express";
import { constructSearchQuery } from "../utils/constructSearchQuery";
import { HotelSearchResponse } from "../../entities/HotelSearchResponse";
import Hotel from "../models/hotel";
import Stripe from "stripe";
import mongoose from "mongoose";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

router.get("/", async (req: Request, res: Response) => {
  try {
    const pageSize = 9;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find()
      .sort("-lastUpdated")
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments();

    const response = {
      data: hotels,
      pagination: {
        pageNumber: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error", error);

    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};

    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments(query);

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid Id" });
    }

    const id = req.params.id.toString();

    try {
      const hotel = await Hotel.findById(id);
      res.json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching the hotel." });
    }
  }
);

router.post(
  "/:hotelId/create-payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const { numberOfNights } = req.body;
      const hotelId = req.params.hotelId;

      const hotel = await Hotel.findById(hotelId);

      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
      }

      const totalCost = hotel.pricePerNight * numberOfNights;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost * 100,
        currency: "usd",
        metadata: {
          hotelId,
          userId: req.userId,
        },
      });

      if (!paymentIntent.client_secret) {
        return res
          .status(500)
          .json({ message: "Error creating payment intent" });
      }

      const response = {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret.toString(),
        totalCost,
      };

      res.send(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId: string = req.body.paymentIntentId;

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      if (!paymentIntent) {
        return res.status(400).json({ message: "payment intent not found" });
      }

      if (
        paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.userId
      ) {
        return res.status(400).json({ message: "payment intent mismatch" });
      }

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({
          message: `payment intent failed. Status: ${paymentIntent.status}`,
        });
      }

      const newBooking: BookingType = { ...req.body, userId: req.userId };

      const hotel = await Hotel.findOneAndUpdate(
        { _id: req.params.hotelId },
        {
          $push: { bookings: newBooking },
        }
      );

      if (!hotel) {
        return res.status(400).json({ message: "hotel not found" });
      }

      await hotel.save();

      res.status(201).send(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

export default router;
