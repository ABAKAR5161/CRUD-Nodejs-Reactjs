import pool from "./db.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const saltRaounds = 10;

const seedUsers = async () => {
  try {
    console.log("🌱 Insertion des utilisateurs...");

    for (let i = 0; i < 100; i++) {
      const username = faker.internet.username();
      const email = faker.internet.email();
      const password = faker.internet.password(8);
      const passwordHash = await bcrypt.hash(password, saltRaounds);
      await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
        [username, email, passwordHash]
      );
    }

    console.log("✅ 100 utilisateurs insérés avec succès");
    process.exit();
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);
    process.exit(1);
  }
};

seedUsers();
