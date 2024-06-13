package org.pregmeal.review;

import jakarta.persistence.*;
import org.pregmeal.recipe.Recipe;
import org.pregmeal.user.User;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double rating;
    private String review;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "u_id")
    private User user;

    public Review(User user, String review, Double rating, Recipe recipe) {
        this.user = user;
        this.review = review;
        this.rating = rating;
        this.recipe = recipe;
    }

    public Review() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
