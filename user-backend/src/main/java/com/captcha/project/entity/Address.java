package com.captcha.project.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "tbl_address")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Address {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;	
	private String addressLine1;
	private String addressLine2;
	private String city;	
	private String state;
	private String pinCode;
	private String country;
}
