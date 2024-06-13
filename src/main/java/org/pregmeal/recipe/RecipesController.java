package org.pregmeal.recipe;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RecipesController {
    private final RecipeService recipeService;
    Jackson2ObjectMapperBuilder mapperBuilder;

    public RecipesController(RecipeService recipeService, Jackson2ObjectMapperBuilder builder) {
        this.recipeService = recipeService;
        this.mapperBuilder = builder;
    }

    @PostMapping("/search")
    @ResponseBody
    public List<RecipeSearchDTO> findRecipes(@RequestBody String jsonBody) throws JsonProcessingException {
        return recipeService.findRecipes(jsonBody);
    }

    @GetMapping("/recipe")
    @ResponseBody
    public RecipeDTO getRecipe(@RequestParam("id") Integer id){
        RecipeDTO recipeDTO = recipeService.getRecipeById(id);
        if(recipeDTO == null){
            throw new IllegalStateException();
        }
        return recipeDTO;
    }

    @PostMapping("/like")
    public void likeRecipe(@RequestParam("recipe") Long recipeId, @RequestBody String jsonBody) throws JsonProcessingException {
        recipeService.likeRecipe(recipeId, jsonBody);
    }

    @GetMapping("/likedrecipes")
    @ResponseBody
    public List<RecipeSearchDTO> getLikedRecipes(@RequestParam("user") Long id){
        return recipeService.getLikedRecipes(id);
    }

    @GetMapping("/select")
    @ResponseBody
    public List<RecipeSearchDTO> getTaggedRecipes(@RequestParam("tag") String tag){
        return recipeService.findRecipesByTag(tag);
    }
}
