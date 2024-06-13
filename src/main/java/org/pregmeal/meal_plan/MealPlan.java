package org.pregmeal.meal_plan;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.pregmeal.meal_plan_day.MealPlanDay;
import org.pregmeal.user.User;

import java.util.List;
import java.util.Set;

@Entity
public class MealPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer duration;

    @OneToMany
    private Set<User> users;

    @OneToMany(mappedBy = "mealPlan", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<MealPlanDay> mealPlanDays;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "user_previously_followed_meal_plans",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name= "meal_plan_id", referencedColumnName = "id"))
    @JsonBackReference
    private List<User> previousFollowers;

    public MealPlan(){

    }

    public MealPlan(String name, int duration) {
        this.name = name;
        this.duration = duration;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
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

    public List<User> getPreviousFollowers() {
        return previousFollowers;
    }

    public void setPreviousFollowers(List<User> previousFollowers) {
        this.previousFollowers = previousFollowers;
    }
}
