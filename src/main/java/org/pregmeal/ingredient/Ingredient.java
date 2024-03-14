package org.pregmeal.ingredient;

import jakarta.persistence.*;
import org.pregmeal.recipe.Recipe;

@Entity
public class Ingredient {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Double fat;
    private Double saturated_fats;
    private Double protein;
    private Double sugars;
    private Double sodium;
    private Double quantity;
    private String unit;
    private Double weight;

    @ManyToOne
    @JoinColumn(name="recipe_id")
    private Recipe recipe;

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

    public Double getFat() {
        return fat;
    }

    public void setFat(Double fat) {
        this.fat = fat;
    }

    public Double getSaturated_fats() {
        return saturated_fats;
    }

    public void setSaturated_fats(Double saturated_fats) {
        this.saturated_fats = saturated_fats;
    }

    public Double getProtein() {
        return protein;
    }

    public void setProtein(Double protein) {
        this.protein = protein;
    }

    public Double getSodium() {
        return sodium;
    }

    public Double getSugars() {
        return sugars;
    }

    public void setSugars(Double sugars) {
        this.sugars = sugars;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public void setSodium(Double sodium) {
        this.sodium = sodium;
    }
}
