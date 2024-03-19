package com.captcha.project.entity;

import com.captcha.project.util.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "User_Details")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@DynamicUpdate
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private Date createdAt;
    private Date updatedAt;
    private String fullName;
    private String email;
    private Role role;
    @JsonFormat(pattern = "dd-MMMM-yyyy")
    private Date dob;
    private String gender;
    private String nationality;
    private boolean isActive;
    private String countryCode;
    private String phoneNumber;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @PrePersist
    public void onCreate() {
        this.createdAt = new Date();
    }

    @PostUpdate
    public void onUpdate() {
        this.updatedAt = new Date();
    }
}
