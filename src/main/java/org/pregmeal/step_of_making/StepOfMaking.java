package org.pregmeal.step_of_making;

import jakarta.persistence.*;
import org.pregmeal.recipe.Recipe;

@Entity
public class StepOfMaking {
    @Id
    @GeneratedValue
    private Long id;

    private String text;

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
