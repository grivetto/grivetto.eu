import React from 'react';
import useFetchData from '../hooks/useFetchData';

const Services = () => {
    const { data, loading, error } = useFetchData('/api/get_data.php');

    if (loading) return <div className="container">Loading services...</div>;
    if (error) return <div className="container">Error: {error.message}</div>;

    return (
        <div className="container" style={{ padding: '4rem 0' }}>
            <h1>Our Services</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                {data && data.services ? data.services.map((service, index) => (
                    <div key={index} style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', backgroundColor: '#fff' }}>
                        <h3>{service.name}</h3>
                        <p style={{ color: '#64748b', marginTop: '0.5rem' }}>{service.description}</p>
                    </div>
                )) : (
                    <p>No services found.</p>
                )}
            </div>
        </div>
    );
};

export default Services;
