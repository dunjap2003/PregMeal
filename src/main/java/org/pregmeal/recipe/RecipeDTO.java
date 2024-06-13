package org.pregmeal.recipe;

import org.pregmeal.ingredient.Ingredient;
import org.pregmeal.review.Review;
import org.pregmeal.step_of_making.StepOfMaking;
import org.pregmeal.user.User;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

public class RecipeDTO {
    private Long id;
    private String name;
    private String cook_time;
    private String prep_time;
    private Timestamp published;
    private Double calories;
    private Double fat;
    private Double saturated_fat;
    private Double cholesterol;
    private Double sodium;
    private Double carbohydrates;
    private Double fiber;
    private Double sugar;
    private Double protein;
    private String tags;
    private Integer servings;
    private List<Ingredient> ingredients;
    private List<StepOfMaking> stepsOfMaking;
    private List<Review> reviews;
    private Set<User> users;

    public RecipeDTO(Long id, String name, String cook_time, String prep_time, Timestamp published, Double calories, Double fat, Double saturated_fat, Double cholesterol, Double sodium, Double carbohydrates, Double fiber, Double sugar, Double protein, String tags, Integer servings, List<Ingredient> ingredients, List<StepOfMaking> stepsOfMaking, List<Review> reviews, Set<User> users) {
        this.id = id;
        this.name = name;
        this.cook_time = cook_time;
        this.prep_time = prep_time;
        this.published = published;
        this.calories = calories;
        this.fat = fat;
        this.saturated_fat = saturated_fat;
        this.cholesterol = cholesterol;
        this.sodium = sodium;
        this.carbohydrates = carbohydrates;
        this.fiber = fiber;
        this.sugar = sugar;
        this.protein = protein;
        this.tags = tags;
        this.servings = servings;
        this.ingredients = ingredients;
        this.stepsOfMaking = stepsOfMaking;
        this.reviews = reviews;
        this.users = users;
    }

    public RecipeDTO(Recipe recipe, List<Ingredient> ingredients, List<StepOfMaking> stepsOfMaking, List<Review> review) {
        this.id = recipe.getId();
        this.name = recipe.getName();
        this.cook_time = recipe.getCook_time();
        this.prep_time = recipe.getPrep_time();
        this.published = recipe.getPublished();
        this.calories = recipe.getCalories();
        this.fat = recipe.getFat();
        this.saturated_fat = recipe.getSaturated_fat();
        this.cholesterol = recipe.getCholesterol();
        this.sodium = recipe.getSodium();
        this.carbohydrates = recipe.getCarbohydrates();
        this.fiber = recipe.getFiber();
        this.sugar = recipe.getSugar();
        this.protein = recipe.getProtein();
        this.tags = recipe.getTags();
        this.servings = recipe.getServings();
        this.ingredients = ingredients;
        this.stepsOfMaking = stepsOfMaking;
        this.reviews = review;
        this.users = recipe.getUsers();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCook_time() {
        return cook_time;
    }

    public void setCook_time(String cook_time) {
        this.cook_time = cook_time;
    }

    public String getPrep_time() {
        return prep_time;
    }

    public void setPrep_time(String prep_time) {
        this.prep_time = prep_time;
    }

    public Timestamp getPublished() {
        return published;
    }

    public void setPublished(Timestamp published) {
        this.published = published;
    }

    public Double getCalories() {
        return calories;
    }

    public void setCalories(Double calories) {
        this.calories = calories;
    }

    public Double getFat() {
        return fat;
    }

    public void setFat(Double fat) {
        this.fat = fat;
    }

    public Double getSaturated_fat() {
        return saturated_fat;
    }

    public void setSaturated_fat(Double saturated_fat) {
        this.saturated_fat = saturated_fat;
    }

    public Double getCholesterol() {
        return cholesterol;
    }

    public void setCholesterol(Double cholesterol) {
        this.cholesterol = cholesterol;
    }

    public Double getSodium() {
        return sodium;
    }

    public void setSodium(Double sodium) {
        this.sodium = sodium;
    }

    public Double getCarbohydrates() {
        return carbohydrates;
    }

    public void setCarbohydrates(Double carbohydrates) {
        this.carbohydrates = carbohydrates;
    }

    public Double getFiber() {
        return fiber;
    }

    public void setFiber(Double fiber) {
        this.fiber = fiber;
    }

    public Double getSugar() {
        return sugar;
    }

    public void setSugar(Double sugar) {
        this.sugar = sugar;
    }

    public Double getProtein() {
        return protein;
    }

    public void setProtein(Double protein) {
        this.protein = protein;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public Integer getServings() {
        return servings;
    }

    public void setServings(Integer servings) {
        this.servings = servings;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public List<StepOfMaking> getStepsOfMaking() {
        return stepsOfMaking;
    }

    public void setStepsOfMaking(List<StepOfMaking> stepsOfMaking) {
        this.stepsOfMaking = stepsOfMaking;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
