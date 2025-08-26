import React, { useState, useEffect } from 'react';
// Import the generated types and API classes
import { 
  CandidatesApi, 
  Configuration 
} from '../api/apis/candidates-api';
import { 
  CandidateResponse, 
  CandidatePageResponse 
} from '../api/models';

/**
 * Sample React component demonstrating how to use the generated API client.
 * This component shows how the OpenAPI-generated TypeScript client provides
 * type safety and auto-completion for API calls.
 */
const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Configure the API client with base URL
  const configuration = new Configuration({
    basePath: 'http://localhost:8080/api/v1'
  });
  
  const candidatesApi = new CandidatesApi(configuration);

  useEffect(() => {
    fetchCandidates();
  }, [page]);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // The generated API client provides full type safety
      const response = await candidatesApi.searchCandidates(
        page,     // page
        20,       // size
        'createdAt,desc', // sort
        undefined, // search
        undefined, // skills
        undefined, // experience
        undefined  // location
      );
      
      const pageResponse: CandidatePageResponse = response.data;
      setCandidates(pageResponse.content || []);
      setTotalPages(pageResponse.totalPages || 0);
    } catch (err) {
      setError('Failed to fetch candidates');
      console.error('Error fetching candidates:', err);
    } finally {
      setLoading(false);
    }
  };

  const createSampleCandidate = async () => {
    try {
      const newCandidate = await candidatesApi.createCandidate({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-987-6543',
        summary: 'Experienced React developer with 3 years of experience',
        experience: 3,
        skills: ['React', 'TypeScript', 'Node.js', 'GraphQL']
      });
      
      console.log('Created candidate:', newCandidate.data);
      // Refresh the list
      fetchCandidates();
    } catch (err) {
      setError('Failed to create candidate');
      console.error('Error creating candidate:', err);
    }
  };

  if (loading) {
    return <div className="loading">Loading candidates...</div>;
  }

  return (
    <div className="candidate-list">
      <div className="header">
        <h2>Candidate Management</h2>
        <button onClick={createSampleCandidate} className="create-btn">
          Create Sample Candidate
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="candidates">
        {candidates.length === 0 ? (
          <div className="no-candidates">
            <p>No candidates found. Click "Create Sample Candidate" to add one.</p>
          </div>
        ) : (
          candidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <h3>{candidate.firstName} {candidate.lastName}</h3>
              <p>Email: {candidate.email}</p>
              {candidate.phone && <p>Phone: {candidate.phone}</p>}
              {candidate.summary && <p>Summary: {candidate.summary}</p>}
              {candidate.experience && <p>Experience: {candidate.experience} years</p>}
              {candidate.skills && candidate.skills.length > 0 && (
                <div className="skills">
                  <span>Skills: </span>
                  {candidate.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                      {index < candidate.skills!.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
              )}
              <small>Created: {new Date(candidate.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => setPage(page - 1)} 
            disabled={page <= 0}
          >
            Previous
          </button>
          <span>Page {page + 1} of {totalPages}</span>
          <button 
            onClick={() => setPage(page + 1)} 
            disabled={page >= totalPages - 1}
          >
            Next
          </button>
        </div>
      )}

      <style jsx>{`
        .candidate-list {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .create-btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
        }
        .create-btn:hover {
          background-color: #0056b3;
        }
        .loading, .error {
          text-align: center;
          padding: 20px;
        }
        .error {
          color: #dc3545;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
        }
        .no-candidates {
          text-align: center;
          padding: 40px;
          color: #6c757d;
        }
        .candidate-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          background-color: #f9f9f9;
        }
        .candidate-card h3 {
          margin: 0 0 10px 0;
          color: #333;
        }
        .candidate-card p {
          margin: 5px 0;
        }
        .skills {
          margin: 10px 0;
        }
        .skill-tag {
          background-color: #e9ecef;
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 0.9em;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-top: 20px;
        }
        .pagination button {
          padding: 8px 12px;
          border: 1px solid #ddd;
          background-color: white;
          cursor: pointer;
          border-radius: 4px;
        }
        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .pagination button:not(:disabled):hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default CandidateList;
