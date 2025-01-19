import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function View() {
    const [data, setData] = useState(null);
    const [fileData, setFileData] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();
    const index = state?.index;

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(`http://localhost:8000/id_files?id=${index}`);
                const result = await response.json();
                setFileData(result.files || []);
            } catch (error) {
                console.error("Error fetching file data:", error);
            }
        };
        fetchFiles();
    }, [index]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/get_info_id/${index}`);
                const details = await response.json();
                setData(details);
            } catch (error) {
                console.error("Error fetching study details:", error);
            }
        };
        fetchDetails();
    }, [index]);

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                backgroundColor: '#f4f4f9',
                minHeight: '100vh',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Study and File Details</h2>

            {fileData.length > 0 ? (
                <div
                    style={{
                        width: '400px',
                        padding: '20px',
                        marginBottom: '20px',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h3 style={{ color: '#555' }}>File Information</h3>
                    <ul>
                        {fileData.map((file, index) => (
                            <li key={index}>
                                <strong>File Name:</strong> {file.filename}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p style={{ color: '#888', marginBottom: '20px' }}>No files to show</p>
            )}

            {data ? (
                <div
                    style={{
                        width: '400px',
                        padding: '20px',
                        borderRadius: '10px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h3 style={{ color: '#555' }}>Study Information</h3>
                    <p><strong>Study Name:</strong> {data.study_name}</p>
                    <p><strong>Study Phase:</strong> {data.study_phase}</p>
                    <p><strong>Sponsor Name:</strong> {data.sponsor_name}</p>
                    <p><strong>Study Description:</strong> {data.study_description}</p>
                </div>
            ) : (
                <p style={{ color: '#888', marginBottom: '20px' }}>No study details to show</p>
            )}

            <button
                onClick={handleBack}
                style={{
                    marginTop: '30px',
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
            >
                Back
            </button>
        </div>
    );
}

export default View;
