import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import UserHome from './components/UserHome'
import Confirmation from './components/Confirmation'
import Verification from './components/Verification'
import ProfileSettings from './components/ProfileSettings'
import PasswordChange from './components/PasswordChange'
import RecipeSearch from './components/RecipeSearch'
import RecipeDisplay from './components/RecipeDisplay'
import LikedRecipes from './components/LikedRecipes'
import PremadeMealPlans from './components/PremadeMealPlans'
import DisplayMealPlan from './components/DisplayMealPlan'
import CreateMealPlan from './components/CreateMealPlan'
import MealPlanDays from './components/MealPlanDays'
import RecipeSelect from './components/RecipeSelect'
import GenerateMealPlanInfo from './components/GenerateMealPlanInfo'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/verify/:code" element={<Verification />} />
        <Route path="/profile/:user" element={<ProfileSettings />} />
        <Route path="/passwordChange/:user" element={<PasswordChange />} />
        <Route path="/search" element={<RecipeSearch />} />
        <Route path="/recipe/:id" element={<RecipeDisplay />} />
        <Route path="/likedrecipes" element={<LikedRecipes />} />
        <Route path="/mealplans" element={<PremadeMealPlans />} />
        <Route path="/mealplans/:id" element={<DisplayMealPlan />} />
        <Route path="/create" element={<CreateMealPlan />} />
        <Route path="/mealplandays/:id" element={<MealPlanDays />} />
        <Route path="/select/:id/:day/:tag" element={<RecipeSelect />} />
        <Route path="/generate" element={<GenerateMealPlanInfo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
