package com.shuviklabs.profilez.controller;

import com.shuviklabs.profilez.model.CandidatePageResponse;
import com.shuviklabs.profilez.model.CandidateResponse;
import com.shuviklabs.profilez.model.CandidateStatusRequest;
import com.shuviklabs.profilez.model.CreateCandidateRequest;
import com.shuviklabs.profilez.model.UpdateCandidateRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Unit tests for CandidatesController.
 * Tests basic functionality and response structure.
 */
class CandidatesControllerTest {

    private CandidatesController controller;

    @BeforeEach
    void setUp() {
        controller = new CandidatesController();
    }

    @Test
    void createCandidateShouldReturnCreatedResponse() {
        // Given
        final CreateCandidateRequest request = new CreateCandidateRequest();
        request.setFirstName("John");
        request.setLastName("Doe");
        request.setEmail("john.doe@example.com");

        // When
        final ResponseEntity<CandidateResponse> response = controller.createCandidate(request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getFirstName()).isEqualTo("John");
        assertThat(response.getBody().getLastName()).isEqualTo("Doe");
        assertThat(response.getBody().getEmail()).isEqualTo("john.doe@example.com");
        assertThat(response.getBody().getId()).isNotNull();
    }

    @Test
    void getCandidateByIdShouldReturnCandidate() {
        // Given
        final UUID candidateId = UUID.randomUUID();

        // When
        final ResponseEntity<CandidateResponse> response = controller.getCandidateById(candidateId);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isEqualTo(candidateId);
        assertThat(response.getBody().getFirstName()).isEqualTo("John");
    }

    @Test
    void deleteCandidateShouldReturnNoContent() {
        // Given
        final UUID candidateId = UUID.randomUUID();

        // When
        final ResponseEntity<Void> response = controller.deleteCandidate(candidateId);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        assertThat(response.getBody()).isNull();
    }

    @Test
    void searchCandidatesShouldReturnPageResponse() {
        // When
        final ResponseEntity<CandidatePageResponse> response = controller.searchCandidates(
                0, 10, "name", "test", "java", 2, "New York"
        );

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getSize()).isEqualTo(10);
        assertThat(response.getBody().getNumber()).isEqualTo(0);
        assertThat(response.getBody().getContent()).isEmpty();
    }

    @Test
    void searchCandidatesWithNullParametersShouldUseDefaults() {
        // When
        final ResponseEntity<CandidatePageResponse> response = controller.searchCandidates(
                null, null, null, null, null, null, null
        );

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getSize()).isEqualTo(20); // Default page size
        assertThat(response.getBody().getNumber()).isEqualTo(0); // Default page number
    }

    @Test
    void updateCandidateShouldReturnUpdatedCandidate() {
        // Given
        final UUID candidateId = UUID.randomUUID();
        final UpdateCandidateRequest request = new UpdateCandidateRequest();
        request.setFirstName("Jane");
        request.setLastName("Smith");
        request.setEmail("jane.smith@example.com");

        // When
        final ResponseEntity<CandidateResponse> response = controller.updateCandidate(candidateId, request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isEqualTo(candidateId);
        assertThat(response.getBody().getFirstName()).isEqualTo("Jane");
        assertThat(response.getBody().getLastName()).isEqualTo("Smith");
    }

    @Test
    void updateCandidateStatusShouldReturnUpdatedCandidate() {
        // Given
        final UUID candidateId = UUID.randomUUID();
        final CandidateStatusRequest request = new CandidateStatusRequest();
        request.setStatus(CandidateStatusRequest.StatusEnum.INTERVIEW_SCHEDULED);
        request.setNotes("Scheduled for next week");

        // When
        final ResponseEntity<CandidateResponse> response = controller.updateCandidateStatus(candidateId, request);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getId()).isEqualTo(candidateId);
        assertThat(response.getBody().getFirstName()).isEqualTo("John");
    }
}
