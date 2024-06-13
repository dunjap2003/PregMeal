package org.pregmeal.ingredient;

import org.pregmeal.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    @Query("select i from Ingredient i where i.recipe = ?1")
    List<Ingredient> getIngredientsByRecipe(Recipe recipe);
}
