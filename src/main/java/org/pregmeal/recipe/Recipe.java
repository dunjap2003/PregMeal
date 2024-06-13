package org.pregmeal.recipe;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.pregmeal.ingredient.Ingredient;
import org.pregmeal.meal_plan_day.MealPlanDay;
import org.pregmeal.review.Review;
import org.pregmeal.step_of_making.StepOfMaking;
import org.pregmeal.user.User;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String cook_time;
    private String prep_time;
    private String total_time;
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

    @OneToMany
    private List<Ingredient> ingredients;

    @OneToMany
    private List<Review> reviews;

    @OneToMany
    private List<StepOfMaking> steps_of_making;

    @OneToMany
    private List<MealPlanDay> mealPlanDays;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_liked_recipes",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id", referencedColumnName = "id"))
    @JsonBackReference
    private Set<User> users;

    public String getCook_time() {
        return cook_time;
    }

    public String getPrep_time() {
        return prep_time;
    }

    public Timestamp getPublished() {
        return published;
    }

    public String getTags() {
        return tags;
    }

    public Double getCholesterol() {
        return cholesterol;
    }

    public Double getFiber() {
        return fiber;
    }

    public Integer getServings() {
        return servings;
    }

    public String getName() {
        return name;
    }

    public Double getFat() {
        return fat;
    }

    public Double getSaturated_fat() {
        return saturated_fat;
    }

    public Double getProtein() {
        return protein;
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

    public Double getCalories() {
        return calories;
    }

    public Double getSugar() {
        return sugar;
    }

    public Double getSodium() {
        return sodium;
    }

    public Double getCarbohydrates() {
        return carbohydrates;
    }

    public Set<User> getUsers() {
        return users;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cook_time='" + cook_time + '\'' +
                ", prep_time='" + prep_time + '\'' +
                ", total_time='" + total_time + '\'' +
                ", published=" + published +
                ", calories=" + calories +
                ", fat=" + fat +
                ", saturated_fat=" + saturated_fat +
                ", cholesterol=" + cholesterol +
                ", sodium=" + sodium +
                ", carbohydrates=" + carbohydrates +
                ", fiber=" + fiber +
                ", sugar=" + sugar +
                ", protein=" + protein +
                ", tags='" + tags + '\'' +
                ", servings=" + servings +
                '}';
    }
}
