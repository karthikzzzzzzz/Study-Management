import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



function Main() {
    const [data, setdata] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudies = async () => {
            const response = await fetch('http://localhost:8000/get_info_all');
            console.log(response)
            const data = await response.json();
            setdata(data);

        }
        fetchStudies();
    }, [])

    const handleAdd = () => {
        navigate('/Add')
    }

    const handleView = (index) => {
        navigate('/View', { state: { index: index } })
    }
    const handleUpdate = (index) => {
        navigate('/Update', { state: { index: index } })
    }

    const handleDelete = async () => {
        const lastStudyId = data[data.length - 1]?.study_id;
        const response = await fetch(`http://localhost:8000/delete_info?id=${lastStudyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response) {
            alert('data deleted')
            window.location.reload()
        } else {
            alert('data not deleted')
        }

    }

    const handleFile = async (event, study_id) => {
        const uploadedFiles = event.target.files;
        const formData = new FormData();
        Array.from(uploadedFiles).forEach((file) => {
            formData.append("files", file);
        });
        const response_file = await fetch(`http://localhost:8000/upload_file?id=${study_id}`, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })

    }


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <h1>Study Management</h1>
            <div >
                <table border="1" style={{ backgroundColor: 'lightblue' }}>
                    <thead>
                        <tr>
                            <th>Study name</th>
                            <th>Study phase</th>
                            <th>Sponsor Name</th>
                            <th>Study description</th>
                            <th>Attachments</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((index) => (
                            <tr key={index.study_id}>
                                <td>{index.study_name}</td>
                                <td>{index.study_phase}</td>
                                <td>{index.sponsor_name}</td>
                                <td>{index.study_description}</td>
                                <td>
                                    <label htmlFor={`file-upload-${index.study_id}`}>Upload</label>
                                    <input
                                        id={`file-upload-${index.study_id}`}
                                        type="file"
                                        onChange={(e) => handleFile(e, index.study_id)}
                                        multiple
                                        style={{ display: "none", width: '50px' }}
                                    />
                                </td>
                                <td><button onClick={() => handleView(index.study_id)} >View</button></td>
                                <td><button onClick={() => handleUpdate(index.study_id)}>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '20px', display: 'flex', gap: "40px", marginLeft: '200px' }}>
                    <button onClick={() => handleAdd()}>Add new study</button>
                    <button onClick={() => handleDelete()}>Delete Study</button>
                </div>
            </div>
        </div>
    )
}

export default Main