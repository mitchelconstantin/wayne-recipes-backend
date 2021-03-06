import { db } from "../../lib/database";
import { decode } from "../../lib/hashIdService";

const convertReviews = (dbReviews) => {
  return dbReviews.map((rev) => ({
    reviewerName: rev.user_name,
    score: rev.score,
    comment: rev.comment,
    date: rev.date,
  }));
};

const getUserShortName = async (userEmail) => {
  const [
    name,
  ] = await db.any(
    'select "firstName", "lastName" from users WHERE email = $1',
    [userEmail]
  );
  const shortName = `${name.firstName} ${name.lastName[0]}`;
  return shortName;
};

const getRecipeReviewForUser = async (recipeId, userEmail) => {
  const [
    review,
  ] = await db.any(
    "select * from reviews WHERE recipe_id = $1 AND user_email = $2",
    [recipeId, userEmail]
  );
  return review;
};

export class ReviewHandler {
  static async getAllReviewsForRecipe(req, res) {
    const dbId = decode(req.params.recipeId);
    if (!dbId) res.status(404).send({ error: "invalid recipeId" });

    const reviews = await db.any(
      'select * from "reviews" WHERE recipe_id = $1',
      dbId
    );
    res.json(convertReviews(reviews));
  }

  static async getUserRecipeReview(req, res) {
    const dbId = decode(req.params.recipeId);
    const rev = await getRecipeReviewForUser(dbId, req.params.userEmail);
    res.json(rev || {});
  }

  static async postRecipeReview(req, res) {
    const dbId = decode(req.body.data.review.recipeId);
    if (!dbId) res.status(404).send({ error: "invalid recipeId" });
    const dbShortName = await getUserShortName(
      req.body.data.review.reviewerEmail
    );
    const dbUserReview = await getRecipeReviewForUser(
      dbId,
      req.body.data.review.reviewerEmail
    );
    const [shortName, userReview] = await Promise.all([
      dbShortName,
      dbUserReview,
    ]);

    if (userReview) {
      const values = [
        dbId,
        req.body.data.review.score,
        req.body.data.review.comment,
      ];
      await db.any(
        'update reviews SET "score" = $2, "comment" = $3 WHERE "recipe_id" = $1',
        values
      );
      res.json({});
    } else {
      const values = [
        req.body.data.review.score,
        req.body.data.review.reviewerEmail,
        shortName,
        dbId,
        req.body.data.review.comment,
      ];
      const newReview = await db.one(
        'INSERT INTO "reviews"("score", "user_email", "user_name", "recipe_id", "comment") VALUES($1, $2, $3, $4, $5) RETURNING id',
        values
      );
      res.json({});
    }
  }
}
