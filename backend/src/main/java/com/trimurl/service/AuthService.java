package com.trimurl.service;

import com.trimurl.dto.AuthRequest;
import com.trimurl.dto.AuthResponse;
import com.trimurl.entity.User;
import com.trimurl.repository.UserRepository;
import com.trimurl.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    public AuthResponse register(AuthRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        user = userRepository.save(user);

        String token = jwtProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .token(token)
                .createdAt(user.getCreatedAt())
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty() || !passwordEncoder.matches(request.getPassword(), userOptional.get().getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = userOptional.get();
        String token = jwtProvider.generateToken(user.getEmail());

        return AuthResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .token(token)
                .createdAt(user.getCreatedAt())
                .build();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
