package org.pregmeal.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JavaMailSender javaMailSender;
    private final Jackson2ObjectMapperBuilder mapperBuilder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JavaMailSenderImpl javaMailSender, Jackson2ObjectMapperBuilder mapperBuilder){
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        setJavaMailSender(javaMailSender);
        this.javaMailSender = javaMailSender;
        this.mapperBuilder = mapperBuilder;
    }

    public void registerUser(String userString) throws MessagingException, UnsupportedEncodingException {
        User user = createNewUser(userString);
        userRepository.save(user);
        sendVerificationEmail(user);
    }

    public void updateUser(String userString) throws JsonProcessingException {
        User user = createUserToUpdate(userString);
        ObjectMapper mapper = mapperBuilder.build();
        JsonNode json = mapper.readTree(userString);
        Long id = json.get("id").asLong();
        Optional<User> savedUser = userRepository.findById(id);
        checkUserUniqueness(id, user.getEmail(), user.getUsername());
        if(savedUser.isPresent()) {
            savedUser.get().setName(user.getName());
            savedUser.get().setSurname(user.getSurname());
            savedUser.get().setEmail(user.getEmail());
            savedUser.get().setBirthdate(user.getBirthdate());
            savedUser.get().setConceptionDate(user.getConceptionDate());
            savedUser.get().setDiabetes(user.getDiabetes());
            savedUser.get().setHeight(user.getHeight());
            savedUser.get().setWeight(user.getWeight());
            LocalDate startDate = LocalDate.of(2023, 1, 1);
            LocalDate endDate = LocalDate.of(2024, 5, 26);
            savedUser.get().setUsername(user.getUsername());
            userRepository.save(savedUser.get());
        }
    }

    public void updatePassword(Integer id, String jsonBody) throws JsonProcessingException {
        ObjectMapper mapper = mapperBuilder.build();
        JsonNode json = mapper.readTree(jsonBody);
        Optional<User> savedUser = userRepository.findById(Long.valueOf(id));


        String oldPassword = json.get("oldPassword").asText();
        String newPassword = json.get("newPassword").asText();

        if(!bCryptPasswordEncoder.matches(oldPassword, savedUser.get().getPassword())) {
            throw new IllegalStateException();
        }

        savedUser.get().setPassword(bCryptPasswordEncoder.encode(newPassword));
        userRepository.save(savedUser.get());
    }

    private void checkUserUniqueness(Long id, String email, String username) {
        Optional<User> userCheckEmail = userRepository.findUserByEmail(email);
        Optional<User> userCheckUsername = userRepository.findUserByUsername(username);

        if(userCheckEmail.isPresent() && !userCheckEmail.get().getId().equals(id)){
            throw new IllegalStateException();
        }

        if(userCheckUsername.isPresent() && !userCheckUsername.get().getId().equals(id)){
            throw new IllegalStateException();
        }
    }

    public User loginUser(String userString){
        Optional<User> saved;
        ObjectMapper mapper = mapperBuilder.build();
        try{
            JsonNode json = mapper.readTree(userString);
            String username = json.get("username").asText();
            String password = json.get("password").asText();
            saved = userRepository.findUserByUsername(username);
            if(saved.isEmpty() || !bCryptPasswordEncoder.matches(password, saved.get().getPassword())){
                throw new IllegalStateException();
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return saved.get();
    }

    public User getUser(Integer id){
        Optional<User> foundUser = userRepository.findById(Long.valueOf(id));
        if(foundUser.isEmpty()){
            throw new IllegalStateException();
        }
        return foundUser.get();
    }

    public boolean checkIfUsernameExists(String username){
        Optional<User> found = userRepository.findUserByUsername(username);
        return found.isPresent();
    }

    public boolean checkIfEmailExists(String email){
        Optional<User> found = userRepository.findUserByEmail(email);
        return found.isPresent();
    }

    public boolean verify(String verificationCode){
        Optional<User> found = userRepository.findUserByVerificationCode(verificationCode);

        if(found.isEmpty() || found.get().getEnabled() == 1){
            return false;
        }

        else{
            found.get().setVerificationCode(null);
            found.get().setEnabled(1);
            userRepository.save(found.get());

            return true;
        }
    }

    private void sendVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "pregmeal.app@gmail.com";
        String senderName = "PregMeal";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "PregMeal App.";

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getName().concat(" ").concat(user.getSurname()));
        String verifyURL = "http://localhost:5173/verify/" + user.getVerificationCode();

        content = content.replace("[[URL]]", verifyURL);
        helper.setText(content, true);

        javaMailSender.send(message);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }

    private User createNewUser(String userString){
        ObjectMapper mapper = mapperBuilder.build();
        try{
            JsonNode json = mapper.readTree(userString);
            String firstName = json.get("firstname").asText();
            String lastName = json.get("lastname").asText();
            String email = json.get("email").asText();
            String username = json.get("username").asText();
            if(checkIfUsernameExists(username) || checkIfEmailExists(email)){
                throw new IllegalStateException();
            }
            String encodedPassword = bCryptPasswordEncoder.encode(json.get("password").asText());
            LocalDate birthDate = LocalDate.parse(json.get("birthdate").asText());
            return new User(birthDate, email, firstName, encodedPassword, lastName, username);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private User createUserToUpdate(String userString){
        ObjectMapper mapper = mapperBuilder.build();
        try{
            JsonNode json = mapper.readTree(userString);
            String firstName = json.get("name").asText();
            String lastName = json.get("surname").asText();
            String email = json.get("email").asText();
            String username = json.get("username").asText();
            LocalDate birthDate = LocalDate.parse(json.get("birthdate").asText());
            LocalDate conceptionDate = LocalDate.parse(json.get("conceptionDate").asText());
            Integer diabetes = json.get("diabetes").asInt();
            Double height = json.get("height").asDouble();
            Double weight = json.get("weight").asDouble();
            return new User(birthDate, conceptionDate, diabetes, email, height, firstName, lastName, username, weight);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public double getDailyCalorieIntake(Long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            double calorieIntake = calculateCalorieIntake(user.get());
            user.get().setDailyCalorieIntake(calorieIntake);
            userRepository.save(user.get());
            return calorieIntake;
        }
        else{
            throw new IllegalStateException();
        }
    }

    private void setJavaMailSender(JavaMailSenderImpl javaMailSender){
        javaMailSender.setHost("smtp.gmail.com");
        javaMailSender.setPort(587);
        javaMailSender.setUsername("pregmealteam@gmail.com");
        javaMailSender.setPassword("yhrd dvdp zkwr csxn");
        Properties props = javaMailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
    }

    private double calculateCalorieIntake(User user){
        double basalMetabolicRate;
        double calorieIntake = 0.0;

        long trimester = getTrimester(user.getConceptionDate());
        int age = getAge(user.getBirthdate());
        basalMetabolicRate = 447.6 + 9.25 * user.getWeight() + 3.10 * user.getHeight() + 4.33 * age;
        if(trimester == 1){
            calorieIntake = basalMetabolicRate + 0.05 * basalMetabolicRate;
        }
        else if(trimester == 2){
            calorieIntake = basalMetabolicRate + 0.1 * basalMetabolicRate;
        }
        else{
            calorieIntake = basalMetabolicRate + 0.25 * basalMetabolicRate;
        }

        if(user.getDiabetes() == 0){
            return calorieIntake;
        }
        else{
            return calorieIntake - 200;
        }
    }

    private long getTrimester(LocalDate conceptionDate){
        LocalDate currentDate = LocalDate.now();
        long totalWeeks = ChronoUnit.WEEKS.between(conceptionDate, currentDate);
        if(totalWeeks < 14){
            return 1;
        }
        else if(totalWeeks < 28){
            return 2;
        }
        else{
            return 3;
        }
    }

    public int getAge(LocalDate birthDate){
        LocalDate currentDate = LocalDate.now();
        Period age = Period.between(birthDate, currentDate);
        return age.getYears();
    }
}
