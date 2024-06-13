package org.pregmeal.meal_plan;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.pregmeal.meal_plan_day.MealPlanDay;
import org.pregmeal.meal_plan_day.MealPlanDayRepository;
import org.pregmeal.recipe.Recipe;
import org.pregmeal.recipe.RecipeRepository;
import org.pregmeal.user.User;
import org.pregmeal.user.UserRepository;
import org.pregmeal.user.UserService;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class MealPlanService {
    private final Jackson2ObjectMapperBuilder mapperBuilder;
    private final UserService userService;
    private MealPlanRepository mealPlanRepository;
    private UserRepository userRepository;
    private RecipeRepository recipeRepository;
    private MealPlanDayRepository mealPlanDayRepository;

    public MealPlanService(Jackson2ObjectMapperBuilder mapperBuilder, MealPlanRepository mealPlanRepository,
                           UserRepository userRepository, RecipeRepository recipeRepository, MealPlanDayRepository mealPlanDayRepository, UserService userService) {
        this.mapperBuilder = mapperBuilder;
        this.mealPlanRepository = mealPlanRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.mealPlanDayRepository = mealPlanDayRepository;
        this.userService = userService;
    }

    public MealPlanDTO getUsersMealPlan(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            MealPlan mealPlan = user.get().getMealPlan();
            if (mealPlan != null) {
                return new MealPlanDTO(mealPlan.getId(), mealPlan.getName(), mealPlan.getDuration(), mealPlan.getMealPlanDays(),
                        user.get().getMealPlanStartingDate());
            } else {
                throw new IllegalStateException();
            }
        } else {
            throw new IllegalStateException();
        }
    }

    public List<MealPlan> getPremadeMealPlans() {
        Optional<MealPlan> mealPlan = mealPlanRepository.findById(73L);
        if (mealPlan.isPresent()) {
            List<MealPlan> premadeMealPlans = new ArrayList<>();
            premadeMealPlans.add(mealPlan.get());
            return premadeMealPlans;
        } else {
            throw new IllegalStateException();
        }
    }

    public MealPlan getMealPlan(Long id) {
        Optional<MealPlan> mealPlan = mealPlanRepository.findById(id);
        if (mealPlan.isPresent()) {
            return mealPlan.get();
        } else {
            throw new IllegalStateException();
        }
    }

    public void followMealPlan(Long id, String jsonBody) throws JsonProcessingException {
        ObjectMapper mapper = mapperBuilder.build();
        JsonNode node = mapper.readTree(jsonBody);
        Optional<MealPlan> mealPlan = mealPlanRepository.findById(id);
        Optional<User> user = userRepository.findById(node.get("user_id").asLong());
        if (mealPlan.isPresent() && user.isPresent()) {
            if (user.get().getMealPlan() != null && user.get().getMealPlan().equals(mealPlan.get())) {
                user.get().setMealPlanStartingDate(null);
                user.get().getPreviouslyFollowedMealPlans().add(user.get().getMealPlan());
                user.get().getMealPlan().getPreviousFollowers().add(user.get());
                mealPlanRepository.save(user.get().getMealPlan());
                user.get().setMealPlan(null);
            } else {
                user.get().setMealPlanStartingDate(LocalDate.now());
                user.get().setMealPlan(mealPlan.get());
            }

            userRepository.save(user.get());
        } else {
            throw new IllegalStateException();
        }
    }

    public boolean isFollowingMealPlan(Long userId, Long mealPlanId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<MealPlan> mealPlan = mealPlanRepository.findById(mealPlanId);
        if (mealPlan.isPresent() && user.isPresent()) {
            return user.get().getMealPlan() != null && user.get().getMealPlan().equals(mealPlan.get());
        } else {
            throw new IllegalStateException();
        }
    }

    public Long createBasicMealPlan(String jsonBody) throws JsonProcessingException {
        ObjectMapper objectMapper = mapperBuilder.build();
        JsonNode jsonNode = objectMapper.readTree(jsonBody);
        String name = jsonNode.get("name").asText();
        int duration = jsonNode.get("duration").asInt();
        Long userId = jsonNode.get("user_id").asLong();
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            user.get().setDailyCalorieIntake(userService.getDailyCalorieIntake(userId));
            userRepository.save(user.get());
        }
        MealPlan mealPlan = new MealPlan(name, duration);
        mealPlanRepository.save(mealPlan);

        List<MealPlanDay> mealPlanDays = new ArrayList<>();
        for (int i = 0; i < duration; i++) {
            MealPlanDay mealPlanDay = new MealPlanDay();
            mealPlanDay.setDay(i + 1);
            mealPlanDay.setMealPlan(mealPlan);
            mealPlanDay = mealPlanDayRepository.save(mealPlanDay);
            mealPlanDays.add(mealPlanDay);
        }

        mealPlan.setMealPlanDays(mealPlanDays);
        mealPlanRepository.save(mealPlan);
        return mealPlan.getId();
    }

    public void addRecipeToMealPlan(String jsonBody) throws JsonProcessingException {
        ObjectMapper objectMapper = mapperBuilder.build();
        JsonNode jsonNode = objectMapper.readTree(jsonBody);
        String recipeId = jsonNode.get("recipe_id").asText();
        String mealPlanId = jsonNode.get("meal_plan_id").asText();
        String tag = jsonNode.get("tag").asText();
        int day = jsonNode.get("day").asInt();

        System.out.println("day " + day);

        Optional<Recipe> recipe = recipeRepository.findById(Long.valueOf(recipeId));
        Optional<MealPlan> mealPlan = mealPlanRepository.findById(Long.valueOf(mealPlanId));

        if (recipe.isPresent() && mealPlan.isPresent()) {
            MealPlan mp = mealPlan.get();

            if (day > mp.getMealPlanDays().size()) {
                throw new IllegalArgumentException("Day index out of bounds");
            }
            
            MealPlanDay mealPlanDay = null;
            for(MealPlanDay mealPlanDay1 : mp.getMealPlanDays()) {
                if(mealPlanDay1.getDay() == day){
                    mealPlanDay = mealPlanDay1;
                }
            }
            
            if (mealPlanDay == null) {
                mealPlanDay = new MealPlanDay();
                mealPlanDay = mealPlanDayRepository.save(mealPlanDay);
                mp.getMealPlanDays().set(day - 1, mealPlanDay);
            }

            switch (tag) {
                case "breakfast":
                    mealPlanDay.setBreakfast(recipe.get());
                    break;
                case "morningsnack":
                    mealPlanDay.setMorningSnack(recipe.get());
                    break;
                case "lunch":
                    mealPlanDay.setLunch(recipe.get());
                    break;
                case "afternoonsnack":
                    mealPlanDay.setAfternoonSnack(recipe.get());
                    break;
                case "dinner":
                    mealPlanDay.setDinner(recipe.get());
                    break;
                default:
                    throw new IllegalArgumentException("Invalid tag: " + tag);
            }
            mealPlanDayRepository.save(mealPlanDay);
            mealPlanRepository.save(mp);
        } else {
            throw new IllegalStateException();
        }
    }

    public void saveMealPlan(String jsonBody) throws JsonProcessingException {
        ObjectMapper objectMapper = mapperBuilder.build();
        JsonNode jsonNode = objectMapper.readTree(jsonBody);

        String mealPlanId = jsonNode.get("meal_plan_id").asText();
        String userId = jsonNode.get("user_id").asText();

        Optional<User> user = userRepository.findById(Long.valueOf(userId));
        Optional<MealPlan> mealPlan = mealPlanRepository.findById(Long.valueOf(mealPlanId));

        if(mealPlan.isPresent() && user.isPresent()) {
            user.get().setMealPlan(mealPlan.get());
            user.get().setMealPlanStartingDate(LocalDate.now());
            userRepository.save(user.get());
        }
    }

    @Transactional
    public MealPlan generateMealPlan(String jsonBody) throws JsonProcessingException {
        ObjectMapper objectMapper = mapperBuilder.build();
        JsonNode jsonNode = objectMapper.readTree(jsonBody);

        String name = jsonNode.get("name").asText();
        String duration = jsonNode.get("duration").asText();
        boolean isVegetarian = jsonNode.get("vegetarian").asBoolean();
        Long userId = jsonNode.get("user_id").asLong();

        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            user.get().setDailyCalorieIntake(userService.getDailyCalorieIntake(userId));

            MealPlan mealPlan = new MealPlan(name, Integer.parseInt(duration));
            mealPlanRepository.save(mealPlan);
            List<Recipe> recipes;
            if(isVegetarian){
                recipes = recipeRepository.findByTagContaining("vegan");
            } else {
                recipes = recipeRepository.findAll();
            }

            List<Recipe> breakfastRecipes = fetchBreakfasts(recipes);
            List<Recipe> snackRecipes = fetchSnacks(recipes);
            List<Recipe> lunchRecipes = fetchLunches(recipes);

            int durationInt = Integer.parseInt(duration);

            List<MealPlanDay> mealPlanDays = new ArrayList<>();
            for(int i = 1; i <= durationInt; i++){
                MealPlanDay mealPlanDay = new MealPlanDay();
                double calorieIntake;
                do{
                    calorieIntake = 0.0;
                    mealPlanDay.setDay(i);
                    mealPlanDay.setMealPlan(mealPlan);
                    int breakfastIndex = getRandomIndex(breakfastRecipes.size());
                    mealPlanDay.setBreakfast(breakfastRecipes.get(breakfastIndex));
                    calorieIntake += breakfastRecipes.get(breakfastIndex).getCalories();
                    int lunchIndex = getRandomIndex(lunchRecipes.size());
                    mealPlanDay.setLunch(lunchRecipes.get(lunchIndex));
                    calorieIntake += lunchRecipes.get(lunchIndex).getCalories();
                    int dinnerIndex = getRandomIndex(snackRecipes.size());
                    mealPlanDay.setDinner(snackRecipes.get(dinnerIndex));
                    calorieIntake += snackRecipes.get(dinnerIndex).getCalories();
                    int morningSnackIndex = getRandomIndex(snackRecipes.size());
                    mealPlanDay.setMorningSnack(snackRecipes.get(morningSnackIndex));
                    calorieIntake += snackRecipes.get(morningSnackIndex).getCalories();
                    int afternoonSnackIndex = getRandomIndex(snackRecipes.size());
                    mealPlanDay.setAfternoonSnack(snackRecipes.get(afternoonSnackIndex));
                    calorieIntake += snackRecipes.get(afternoonSnackIndex).getCalories();
                }while((calorieIntake < user.get().getDailyCalorieIntake() - 100) || (calorieIntake > user.get().getDailyCalorieIntake() + 100));

                mealPlanDayRepository.save(mealPlanDay);
                mealPlanDays.add(mealPlanDay);
            }

            mealPlan.setMealPlanDays(mealPlanDays);
            mealPlanRepository.save(mealPlan);
            return mealPlan;
        }

        else{
            throw new IllegalStateException();
        }
    }

    private List<Recipe> fetchBreakfasts(List<Recipe> recipes) {
        List<Recipe> breakfastRecipes = new ArrayList<>();
        for (Recipe recipe : recipes) {
            if(recipe.getTags().toLowerCase().contains("breakfast")){
                breakfastRecipes.add(recipe);
            }
        }

        return breakfastRecipes;
    }

    private List<Recipe> fetchLunches(List<Recipe> recipes) {
        List<Recipe> lunchRecipes = new ArrayList<>();
        for (Recipe recipe : recipes) {
            if(recipe.getTags().toLowerCase().contains("lunch") && !recipe.getTags().toLowerCase().contains("dessert") && !recipe.getTags().toLowerCase().contains("sweet")){
                lunchRecipes.add(recipe);
            }
        }

        return lunchRecipes;
    }

    private List<Recipe> fetchSnacks(List<Recipe> recipes) {
        List<Recipe> snackRecipes = new ArrayList<>();
        for (Recipe recipe : recipes) {
            if(recipe.getTags().toLowerCase().contains("snack")){
                snackRecipes.add(recipe);
            }
        }

        return snackRecipes;
    }

    public static int getRandomIndex(int n) {
        Random random = new Random();
        int number = random.nextInt();
        while(number >= n || number < 0){
            number = random.nextInt();
        }
        return number;
    }

    public List<MealPlan> getUsersPreviousMealPlans(Long id) {
        Optional<User> user = userRepository.findById(id);

        return user.map(User::getPreviouslyFollowedMealPlans).orElse(null);
    }
}