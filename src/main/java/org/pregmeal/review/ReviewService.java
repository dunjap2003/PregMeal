package org.pregmeal.review;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.pregmeal.recipe.Recipe;
import org.pregmeal.recipe.RecipeRepository;
import org.pregmeal.user.User;
import org.pregmeal.user.UserRepository;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final Jackson2ObjectMapperBuilder mapperBuilder;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    public ReviewService(ReviewRepository reviewRepository, Jackson2ObjectMapperBuilder mapperBuilder, UserRepository userRepository, RecipeRepository recipeRepository) {
        this.reviewRepository = reviewRepository;
        this.mapperBuilder = mapperBuilder;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
    }

    public void leaveReviewOnRecipe(Long recipeId, String jsonBody) throws JsonProcessingException {
        ObjectMapper mapper = mapperBuilder.build();
        JsonNode jsonNode = mapper.readTree(jsonBody);

        Long userId = jsonNode.get("user_id").asLong();
        Optional<User> user = userRepository.findById(userId);
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);

        if(user.isPresent() && recipe.isPresent()) {
            int rating = jsonNode.get("rating").asInt();
            String review = jsonNode.path("review").asText();

            Review reviewObject = new Review(user.get(),review, (double) rating, recipe.get());
            reviewRepository.save(reviewObject);
        }

        else{
            throw new IllegalStateException();
        }
    }

    public void deleteReview(Long recipeId, Long reviewId) {
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);
        if(recipe.isPresent()) {
            Optional<Review> review = reviewRepository.findById(reviewId);
            review.ifPresent(reviewRepository::delete);
        }
    }
}
