package org.pregmeal.meal_plan_day;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.pregmeal.meal_plan.MealPlan;
import org.pregmeal.recipe.Recipe;

@Entity
public class MealPlanDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int day;

    @ManyToOne
    @JoinColumn(name="meal_plan_id")
    @JsonBackReference
    private MealPlan mealPlan;

    @ManyToOne
    @JoinColumn(name="breakfast_id")
    private Recipe breakfast;

    @ManyToOne
    @JoinColumn(name="morning_snack_id")
    private Recipe morningSnack;

    @ManyToOne
    @JoinColumn(name="lunch_id")
    private Recipe lunch;

    @ManyToOne
    @JoinColumn(name="afternoon_snack_id")
    private Recipe afternoonSnack;

    @ManyToOne
    @JoinColumn(name="dinner_id")
    private Recipe dinner;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public MealPlan getMealPlan() {
        return mealPlan;
    }

    public void setMealPlan(MealPlan mealPlan) {
        this.mealPlan = mealPlan;
    }

    public Recipe getBreakfast() {
        return breakfast;
    }

    public void setBreakfast(Recipe breakfast) {
        this.breakfast = breakfast;
    }

    public Recipe getMorningSnack() {
        return morningSnack;
    }

    public void setMorningSnack(Recipe morningSnack) {
        this.morningSnack = morningSnack;
    }

    public Recipe getLunch() {
        return lunch;
    }

    public void setLunch(Recipe lunch) {
        this.lunch = lunch;
    }

    public Recipe getAfternoonSnack() {
        return afternoonSnack;
    }

    public void setAfternoonSnack(Recipe afternoonSnack) {
        this.afternoonSnack = afternoonSnack;
    }

    public Recipe getDinner() {
        return dinner;
    }

    public void setDinner(Recipe dinner) {
        this.dinner = dinner;
    }
}
