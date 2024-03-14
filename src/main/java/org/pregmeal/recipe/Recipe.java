package org.pregmeal.recipe;

import jakarta.persistence.*;
import org.pregmeal.ingredient.Ingredient;
import org.pregmeal.meal_plan.MealPlan;
import org.pregmeal.review.Review;
import org.pregmeal.step_of_making.StepOfMaking;
import org.pregmeal.user.User;

import java.util.List;

@Entity
public class Recipe {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Double fat;
    private Double saturated_fat;
    private Double protein;
    private Double salt;
    private Double sugars;
    private Double energy;
    private String image_url;

    @OneToMany
    private List<Ingredient> ingredients;

    @OneToMany
    private List<Review> reviews;

    @OneToMany
    private List<StepOfMaking> steps_of_making;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_liked_recipes",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"))
    private List<User> users;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "meal_plan_recipes",
            joinColumns = @JoinColumn(name = "meal_plan_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"))
    private List<MealPlan> meal_plans;

    public Recipe() {
    }

    public String getName() {
        return name;
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

    public Double getProtein() {
        return protein;
    }

    public void setProtein(Double protein) {
        this.protein = protein;
    }

    public Double getSalt() {
        return salt;
    }

    public void setSalt(Double salt) {
        this.salt = salt;
    }

    public Double getSugars() {
        return sugars;
    }

    public void setSugars(Double sugars) {
        this.sugars = sugars;
    }

    public Double getEnergy() {
        return energy;
    }

    public void setEnergy(Double energy) {
        this.energy = energy;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
