package org.pregmeal.recipe;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

public class RecipeSearchDTO {
    private Long id;
    private String name;
    private String tags;

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

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public static List<RecipeSearchDTO> fromRecipe(Collection<Recipe> recipes){
        List<RecipeSearchDTO> dtos = new ArrayList<>();
        for(Recipe r : recipes){
            RecipeSearchDTO dto = new RecipeSearchDTO();
            dto.setId(r.getId());
            dto.setName(r.getName());
            dto.setTags(r.getTags());
            dtos.add(dto);
        }

        return dtos;
    }
}
