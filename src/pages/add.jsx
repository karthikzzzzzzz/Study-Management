import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Add() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        study_name: '',
        study_phase: '',
        sponsor_name: '',
        study_description: ''
    });

    const handleCreate = async () => {
        const response = await fetch('http://localhost:8000/create_info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        console.log(response);
    };

    const handleBack = () => {
        navigate('/');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
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
            <div style={{
                width: '400px',
                background: '#ffffff',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                padding: '20px',
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: '#333',
                }}>Add Study Information</h2>
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
                        required
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
                        required
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
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <label style={{ color: '#555', fontSize: '14px' }}>Study Description</label>
                    <textarea
                        name="study_description"
                        value={data.study_description}
                        onChange={handleChange}
                        required
                        style={{
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            minHeight: '80px',
                        }}
                    ></textarea>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '20px',
                    }}>
                        <button
                            type="button"
                            onClick={handleCreate}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#4caf50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                            }}
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={handleBack}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#f44336',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
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

export default Add;
