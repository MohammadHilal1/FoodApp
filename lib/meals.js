import fs from "node:fs";
import { v4 as uuid } from "uuid";
import { query } from "@/config/db";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: "ap-south-1",
});
export async function getMeals() {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    const result = await query("Select * from meals", []);
    return result;
  } catch (error) {
    return error;
  }
}

export async function getMeal(slug) {
  try {
    const result = await query(`Select * from meals where slug =?`, [slug]);
    if (result.length > 0) {
      return result[0];
    } else return null;
  } catch (error) {
    return error;
  }
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const uniqueId = uuid();
  const fileName = `${meal.slug}.${uniqueId}.${extension}`;

  //   const stream = fs.createWriteStream(`public/images/${fileName}`);

  const bufferedImage = await meal.image.arrayBuffer();

  //   stream.write(Buffer.from(bufferedImage), (error) => {
  //     if (error) {
  //       throw new error("Saving image failed");
  //     }
  //   });

  await s3.putObject({
    Bucket: "mohammadhilal-food-images-bucket",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  const result = await query(
    "INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      meal.slug,
      meal.title,
      meal.image,
      meal.summary,
      meal.instructions,
      meal.creator,
      meal.creator_email,
    ]
  );
}
