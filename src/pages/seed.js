import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

// Mock data for the `users` collection
const mockUsers = [
  {
    userId: "user1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    roles: ["donor"],
    createdAt: new Date(),
    profileImageUrl: "https://via.placeholder.com/150",
  },
  {
    userId: "user2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+0987654321",
    roles: ["volunteer"],
    createdAt: new Date(),
    profileImageUrl: "https://via.placeholder.com/150",
  },
];

// Mock data for the `charityEvents` collection
const mockEvents = [
  {
    name: "Food Drive for the Homeless",
    description: "Join us to provide meals for the homeless in our community.",
    startDate: new Date("2025-05-10"),
    endDate: new Date("2025-05-15"),
    startTime: "10:00 AM",
    endTime: "4:00 PM",
    location: "Community Center, Main Street",
    targetAmount: 5000,
    currentAmount: 0,
    status: "planned",
    coverImageUrl: "https://via.placeholder.com/150",
    category: "Food",
  },
  {
    name: "Health Camp for Underprivileged",
    description: "Free health check-ups and medicines for those in need.",
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-05"),
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    location: "City Hospital, Downtown",
    targetAmount: 10000,
    currentAmount: 0,
    status: "planned",
    coverImageUrl: "https://via.placeholder.com/150",
    category: "Health",
  },
];

// Mock data for the `donations` collection
const mockDonations = [
  {
    donationId: "donation1",
    donorId: "user1",
    eventId: "event1",
    amount: 100,
    status: "completed",
    stripePaymentId: "pi_12345",
    donationDate: new Date(),
  },
  {
    donationId: "donation2",
    donorId: "user2",
    eventId: "event2",
    amount: 50,
    status: "completed",
    stripePaymentId: "pi_67890",
    donationDate: new Date(),
  },
];

// Mock data for the `attendance` collection
const mockAttendance = [
  {
    attendanceId: "attendance1",
    userId: "user1",
    eventId: "event1",
    attendanceDate: new Date(),
  },
  {
    attendanceId: "attendance2",
    userId: "user2",
    eventId: "event2",
    attendanceDate: new Date(),
  },
];

// Mock data for the `images` collection
const mockImages = [
  {
    imageId: "image1",
    eventId: "event1",
    userId: "user1",
    url: "https://via.placeholder.com/150",
    caption: "Event 1 Image",
    uploadDate: new Date(),
  },
  {
    imageId: "image2",
    eventId: "event2",
    userId: "user2",
    url: "https://via.placeholder.com/150",
    caption: "Event 2 Image",
    uploadDate: new Date(),
  },
];

// Function to seed a collection
const seedCollection = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    for (const item of data) {
      await addDoc(collectionRef, item);
    }
    console.log(`${collectionName} seeded successfully!`);
  } catch (error) {
    console.error(`Error seeding ${collectionName}:`, error);
  }
};

// Seed all collections
const seedDatabase = async () => {
  await seedCollection("users", mockUsers);
  await seedCollection("charityEvents", mockEvents);
  await seedCollection("donations", mockDonations);
  await seedCollection("attendance", mockAttendance);
  await seedCollection("images", mockImages);
};

seedDatabase();