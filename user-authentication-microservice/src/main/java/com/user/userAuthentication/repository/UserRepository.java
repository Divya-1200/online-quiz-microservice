package com.user.userAuthentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.user.userAuthentication.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
