
package com.sagar.careertrack.repository;

import com.sagar.careertrack.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

}
