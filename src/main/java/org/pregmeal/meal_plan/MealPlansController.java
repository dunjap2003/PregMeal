package org.pregmeal.meal_plan;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MealPlansController {
    private MealPlanService mealPlanService;

    public MealPlansController(MealPlanService mealPlanService) {
        this.mealPlanService = mealPlanService;
    }

    @GetMapping("/")
    @ResponseBody
    public MealPlanDTO getUsersMealPlan(@RequestParam("user") Long id){
        return mealPlanService.getUsersMealPlan(id);
    }

    @GetMapping("/previous")
    @ResponseBody
    public List<MealPlan> getPreviousMealPlan(@RequestParam("user") Long id){
        return mealPlanService.getUsersPreviousMealPlans(id);
    }

    @GetMapping("/mealplans/premade")
    @ResponseBody
    public List<MealPlan> getPremadeMealPlans(){
        return mealPlanService.getPremadeMealPlans();
    }

    @GetMapping("/mealplans")
    @ResponseBody
    public MealPlan getMealPlan(@RequestParam("id") Long id){
        return mealPlanService.getMealPlan(id);
    }

    @PostMapping("/follow")
    public void followMealPlan(@RequestParam("mealPlanId") Long id, @RequestBody String jsonBody) throws JsonProcessingException {
        mealPlanService.followMealPlan(id, jsonBody);
    }

    @GetMapping("/isFollowing")
    public boolean isFollowingMealPlan(@RequestParam("userId") Long userId, @RequestParam("mealPlanId") Long mealPlanId){
        return mealPlanService.isFollowingMealPlan(userId, mealPlanId);
    }

    @PostMapping("/createMealPlan")
    public Long createBasicMealPlan(@RequestBody String jsonBody) throws JsonProcessingException {
        return mealPlanService.createBasicMealPlan(jsonBody);
    }

    @GetMapping("/mealplandays")
    public MealPlan getBasicMealPlan(@RequestParam("id") Long id){
        return mealPlanService.getMealPlan(id);
    }

    @PostMapping("/addRecipeToMealPlan")
    public void addRecipeToMealPlan(@RequestBody String jsonBody) throws JsonProcessingException {
        mealPlanService.addRecipeToMealPlan(jsonBody);
    }

    @PostMapping("/saveMealPlan")
    public void saveMealPlan(@RequestBody String jsonBody) throws JsonProcessingException {
        mealPlanService.saveMealPlan(jsonBody);
    }

    @PostMapping("/generate")
    public MealPlan generateMealPlan(@RequestBody String jsonBody) throws JsonProcessingException {
        return mealPlanService.generateMealPlan(jsonBody);
    }
}
