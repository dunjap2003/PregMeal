package org.pregmeal.user;

import jakarta.persistence.*;
import org.pregmeal.meal_plan.MealPlan;
import org.pregmeal.review.Review;
import org.pregmeal.recipe.Recipe;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "\"User\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String username;
    private String name;
    private String surname;
    private String password;

    private Date birthdate;

    @OneToMany
    private List<MealPlan> meal_plans;

    @OneToMany
    private List<Review> reviews;

    @ManyToMany(mappedBy = "users")
    private List<Recipe> recipes;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(Date birthdate) {
        this.birthdate = birthdate;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
