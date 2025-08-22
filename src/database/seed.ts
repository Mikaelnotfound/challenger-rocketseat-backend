import { fakerPT_BR as faker } from "@faker-js/faker";
import { db } from "./client";
import { courses, enrollments, users } from "./schema";

async function runSeed() {
  console.log("Seeding database...");

  await db.delete(enrollments);
  await db.delete(courses);
  await db.delete(users);

  const usersInsert = await db
    .insert(users)
    .values([
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
      { name: faker.person.fullName(), email: faker.internet.email() },
    ])
    .returning();

  const coursesInsert = await db
    .insert(courses)
    .values([{ title: faker.lorem.words(4) }, { title: faker.lorem.words(4) }])
    .returning();

  await db.insert(enrollments).values([
    { courseId: coursesInsert[0].id, userId: usersInsert[0].id },
    { courseId: coursesInsert[0].id, userId: usersInsert[1].id },
    { courseId: coursesInsert[1].id, userId: usersInsert[2].id },
    { courseId: coursesInsert[1].id, userId: usersInsert[3].id },
    { courseId: coursesInsert[1].id, userId: usersInsert[4].id },
  ]);
}

runSeed()
  .then(() => {
    console.log("Seeding complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
