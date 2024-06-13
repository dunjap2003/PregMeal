package org.pregmeal.step_of_making;

import org.pregmeal.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StepOfMakingRepository extends JpaRepository<StepOfMaking, Long> {
    @Query("select s from StepOfMaking s where s.recipe = ?1")
    List<StepOfMaking> getStepsOfMakingByRecipe(Recipe recipe);
}
