package org.pregmeal.meal_plan;

import org.pregmeal.meal_plan_day.MealPlanDay;

import java.time.LocalDate;
import java.util.List;

public class MealPlanDTO {
    private Long id;
    private String name;
    private Integer duration;
    private List<MealPlanDay> mealPlanDays;
    private LocalDate startingDate;

    public MealPlanDTO(Long id, String name, Integer duration, List<MealPlanDay> mealPlanDays, LocalDate startingDate) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.mealPlanDays = mealPlanDays;
        this.startingDate = startingDate;
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

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public List<MealPlanDay> getMealPlanDays() {
        return mealPlanDays;
    }

    public void setMealPlanDays(List<MealPlanDay> mealPlanDays) {
        this.mealPlanDays = mealPlanDays;
    }

    public LocalDate getStartingDate() {
        return startingDate;
    }

    public void setStartingDate(LocalDate startingDate) {
        this.startingDate = startingDate;
    }
}
