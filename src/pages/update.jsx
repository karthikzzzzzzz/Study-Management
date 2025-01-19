import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Update() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const index = state?.index;

    const [data, setData] = useState({
        study_name: '',
        study_phase: '',
        sponsor_name: '',
        study_description: ''
    });
    const [viewData, setViewData] = useState();

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(`http://localhost:8000/get_info_id/${index}`);
            const result = await response.json();
            setViewData(result);
            setData({
                study_name: result.study_name,
                study_phase: result.study_phase,
                sponsor_name: result.sponsor_name,
                study_description: result.study_description
            });
        };
        fetchDetails();
    }, [index]);

    const updateInfo = async () => {
        const response = await fetch(`http://localhost:8000/update_info?id=${index}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Data updated successfully');
        } else {
            alert('Failed to update data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleBack = () => {
        navigate('/');
    };

    const handleFile = async (event) => {
        const uploadedFiles = event.target.files;
        const formData = new FormData();
        Array.from(uploadedFiles).forEach((file) => formData.append('files', file));

        const response = await fetch('http://localhost:8000/upload_file', {
            method: 'POST',
            body: formData,
        });
        const fileData = await response.json();
        console.log(fileData);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            backgroundColor: '#f4f4f9',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif',
        }}>
            {viewData ? (
                <div style={{
                    width: '800px',
                    padding: '20px',
                    marginBottom: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    color: '#333',
                }}>
                    <h3 style={{ marginBottom: '10px', color: '#555' }}>Current Study Details</h3>
                    <p><strong>Study Name:</strong> {viewData.study_name}</p>
                    <p><strong>Study Phase:</strong> {viewData.study_phase}</p>
                    <p><strong>Sponsor Name:</strong> {viewData.sponsor_name}</p>
                    <p><strong>Study Description:</strong> {viewData.study_description}</p>
                </div>
            ) : (
                <p style={{ color: '#888' }}>Nothing to show</p>
            )}

            <div style={{
                width: '400px',
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Update Study Details</h3>
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                }}>
                    <label style={{ color: '#555', fontSize: '14px' }}>Study Name</label>
                    <input
                        type="text"
                        name="study_name"
                        value={data.study_name}
                        onChange={handleChange}
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <label style={{ color: '#555', fontSize: '14px' }}>Study Phase</label>
                    <input
                        type="text"
                        name="study_phase"
                        value={data.study_phase}
                        onChange={handleChange}
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <label style={{ color: '#555', fontSize: '14px' }}>Sponsor Name</label>
                    <input
                        type="text"
                        name="sponsor_name"
                        value={data.sponsor_name}
                        onChange={handleChange}
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <label style={{ color: '#555', fontSize: '14px' }}>Study Description</label>
                    <input
                        type="text"
                        name="study_description"
                        value={data.study_description}
                        onChange={handleChange}
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <label
                        htmlFor="file-upload"
                        style={{
                            display: 'inline-block',
                            padding: '10px 15px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            textAlign: 'center',
                        }}
                    >
                        Upload Files
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleFile}
                        multiple
                        style={{ display: 'none' }}
                    />

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}>
                        <button
                            type="button"
                            onClick={updateInfo}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleBack}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#dc3545',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Update;
