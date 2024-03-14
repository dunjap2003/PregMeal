package org.pregmeal.meal_plan;

import jakarta.persistence.*;
import org.pregmeal.user.User;
import org.pregmeal.recipe.Recipe;

import java.util.Date;
import java.util.List;

@Entity
public class MealPlan {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private Integer duration;
    private Date begin_date;

    private Integer status;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToMany(mappedBy = "meal_plans")
    private List<Recipe> recipes;

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

    public Date getBegin_date() {
        return begin_date;
    }

    public void setBegin_date(Date begin_date) {
        this.begin_date = begin_date;
    }
}
