package org.pregmeal.review;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReviewsController {
    ReviewService reviewService;

    public ReviewsController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/review")
    public void leaveReview(@RequestParam("recipe") Long recipeId, @RequestBody String jsonBody) throws JsonProcessingException {
        reviewService.leaveReviewOnRecipe(recipeId, jsonBody);
    }

    @DeleteMapping("/review")
    public void deleteReview(@RequestParam("recipe") Long recipeId, @RequestParam("review") Long reviewId){
        reviewService.deleteReview(recipeId, reviewId);
    }

}
