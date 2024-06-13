package org.pregmeal.recipe;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import org.pregmeal.ingredient.Ingredient;
import org.pregmeal.ingredient.IngredientRepository;
import org.pregmeal.review.Review;
import org.pregmeal.review.ReviewRepository;
import org.pregmeal.step_of_making.StepOfMaking;
import org.pregmeal.step_of_making.StepOfMakingRepository;
import org.pregmeal.user.User;
import org.pregmeal.user.UserRepository;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RecipeService {
    private final Jackson2ObjectMapperBuilder mapperBuilder;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final StepOfMakingRepository stepOfMakingRepository;
    private final ReviewRepository reviewRepository;

    public RecipeService(Jackson2ObjectMapperBuilder mapperBuilder, UserRepository userRepository, RecipeRepository recipeRepository, IngredientRepository ingredientRepository, StepOfMakingRepository stepOfMakingRepository, ReviewRepository reviewRepository) {
        this.mapperBuilder = mapperBuilder;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.stepOfMakingRepository = stepOfMakingRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<RecipeSearchDTO> findRecipes(String jsonBody) throws JsonProcessingException {
        ObjectMapper mapper = mapperBuilder.build();
        JsonNode node = mapper.readTree(jsonBody);

        String searchBy = node.get("searchBy").asText();
        String searchWords = node.get("searchWords").asText();
        List<RecipeSearchDTO> recipes;

        if(searchBy.equals("Recipe tag")){
            recipes = findRecipesByTag(searchWords);
        }
        else{
            recipes = findRecipesByName(searchWords);
        }

        if(recipes.isEmpty()){
            throw new IllegalStateException();
        }

        return recipes;
    }

    public RecipeDTO getRecipeById(Integer id){
        Optional<Recipe> recipe = recipeRepository.findById(Long.valueOf(id));
        if(recipe.isPresent()){
            Recipe foundRecipe = recipe.get();
            List<Ingredient> ingredients = ingredientRepository.getIngredientsByRecipe(foundRecipe);
            List<StepOfMaking> stepsOfMaking = stepOfMakingRepository.getStepsOfMakingByRecipe(foundRecipe);
            List<Review> reviews = reviewRepository.getReviewsByRecipe(foundRecipe);
            return new RecipeDTO(foundRecipe, ingredients, stepsOfMaking, reviews);
        }
        else{
            throw new IllegalStateException();
        }
    }

    public void likeRecipe(Long recipeId, String jsonBody) throws JsonProcessingException {
        Optional<Recipe> recipe = recipeRepository.findById(recipeId);
        ObjectMapper mapper = mapperBuilder.build();
        JsonNode node = mapper.readTree(jsonBody);
        Long userId = node.get("user_id").asLong();
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent() && recipe.isPresent()){
            User foundUser = user.get();
            Recipe foundRecipe = recipe.get();
            if(foundRecipe.getUsers().contains(foundUser)){
                foundUser.getRecipes().remove(foundRecipe);
                foundRecipe.getUsers().remove(foundUser);
            }
            else{
                foundUser.getRecipes().add(foundRecipe);
                foundRecipe.getUsers().add(foundUser);
            }
            userRepository.save(foundUser);
            recipeRepository.save(foundRecipe);
        }
    }

    public List<RecipeSearchDTO> getLikedRecipes(Long userId){
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            User foundUser = user.get();
            Set<Recipe> foundRecipes = foundUser.getRecipes();
            return RecipeSearchDTO.fromRecipe(foundRecipes);
        }
        return null;
    }


    public List<RecipeSearchDTO> findRecipesByTag(String searchWord){
        String queryParameter = "%".concat(searchWord.toLowerCase()).concat("%");
        List<Recipe> recipes = recipeRepository.findByTagContaining(queryParameter);
        return RecipeSearchDTO.fromRecipe(recipes);
    }

    private List<RecipeSearchDTO> findRecipesByName(String searchWord){
        String queryParameter = "%".concat(searchWord.toLowerCase()).concat("%");
        List<Recipe> recipes = recipeRepository.findByNameContaining(queryParameter);
        return RecipeSearchDTO.fromRecipe(recipes);
    }
}
