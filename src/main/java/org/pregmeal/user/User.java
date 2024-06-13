package org.pregmeal.user;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.pregmeal.meal_plan.MealPlan;
import org.pregmeal.review.Review;
import org.pregmeal.recipe.Recipe;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

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
    private LocalDate birthdate;
    private Integer enabled;
    private Double weight;
    private Double height;
    private LocalDate conceptionDate;
    private Integer diabetes;
    private Integer status;
    private LocalDate mealPlanStartingDate;
    private Double dailyCalorieIntake;

    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    @ManyToOne
    private MealPlan mealPlan;

    @OneToMany
    private List<Review> reviews;

    @ManyToMany(mappedBy = "users")
    @JsonManagedReference
    private Set<Recipe> recipes;

    @ManyToMany(mappedBy = "previousFollowers")
    @JsonManagedReference
    private List<MealPlan> previouslyFollowedMealPlans;

    public User(LocalDate birthdate, String email, String name, String password, String surname, String username) {
        this.birthdate = birthdate;
        this.email = email;
        this.name = name;
        this.username = username;
        this.surname = surname;
        this.password = password;
        this.enabled = 0;
        this.verificationCode = username;
        this.weight = null;
        this.height = null;
        this.conceptionDate = null;
        this.diabetes = 0;
        this.status = 1;
    }

    public User(LocalDate birthdate, LocalDate conceptionDate, Integer diabetes, String email, Double height, String name, String surname, String username, Double weight) {
        this.birthdate = birthdate;
        this.email = email;
        this.name = name;
        this.username = username;
        this.surname = surname;
        this.enabled = 0;
        this.verificationCode = username;
        this.weight = weight;
        this.height = height;
        this.conceptionDate = conceptionDate;
        this.diabetes = diabetes;
        this.status = 1;
    }

    public User() {

    }

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

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Integer getEnabled() {
        return enabled;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public LocalDate getConceptionDate() {
        return conceptionDate;
    }

    public void setConceptionDate(LocalDate conceptionDate) {
        this.conceptionDate = conceptionDate;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Integer getDiabetes() {
        return diabetes;
    }

    public void setDiabetes(Integer diabetes) {
        this.diabetes = diabetes;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Set<Recipe> getRecipes() {
        return recipes;
    }

    public void setRecipes(Set<Recipe> recipes) {
        this.recipes = recipes;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", password='" + password + '\'' +
                ", birthdate=" + birthdate +
                ", enabled=" + enabled +
                ", weight=" + weight +
                ", height=" + height +
                ", conceptionDate=" + conceptionDate +
                ", diabetes=" + diabetes +
                ", status=" + status +
                ", verificationCode='" + verificationCode + '\'' +
                ", meal_plan=" + mealPlan +
                ", reviews=" + reviews +
                ", recipes=" + recipes +
                '}';
    }

    public MealPlan getMealPlan() {
        return mealPlan;
    }

    public void setMealPlan(MealPlan mealPlan) {
        this.mealPlan = mealPlan;
    }

    public LocalDate getMealPlanStartingDate() {
        return mealPlanStartingDate;
    }

    public void setMealPlanStartingDate(LocalDate mealPlanStartingDate) {
        this.mealPlanStartingDate = mealPlanStartingDate;
    }

    public Double getDailyCalorieIntake() {
        return dailyCalorieIntake;
    }

    public void setDailyCalorieIntake(Double dailyCalorieIntake) {
        this.dailyCalorieIntake = dailyCalorieIntake;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<MealPlan> getPreviouslyFollowedMealPlans() {
        return previouslyFollowedMealPlans;
    }
}
