package org.pregmeal.recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("select r from Recipe r where lower(r.tags) like ?1 and r.calories <= 600")
    List<Recipe> findByTagContaining(String tag);

    @Query("select r from Recipe r where lower(r.name) like ?1 and r.calories <= 600")
    List<Recipe> findByNameContaining(String name);

}
