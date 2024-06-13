package org.pregmeal.review;

import org.pregmeal.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("select r from Review r where r.recipe = ?1")
    public List<Review> getReviewsByRecipe(Recipe r);
}
